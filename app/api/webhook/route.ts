import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  console.log("Event : "+event);

  switch (event.type) {
    case "invoice.payment_succeeded": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const metadata = subscription.metadata;
      const { userId, count, stripePriceId } = metadata;

      try {
        // Create or update UserSubscription
        await prismadb.userSubscription.upsert({
          where: {
            userId: userId,
          },
          update: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: stripePriceId || subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          create: {
            userId: userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: stripePriceId || subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        // Upsert UserApiLimit - either update count if it exists, or create a new record
        await prismadb.userApiLimit.upsert({
          where: {
            userId: userId,
          },
          update: {
            count: parseInt(count) || 0,
            limit: parseInt(count) || 0,
          },
          create: {
            userId: userId,
            count: parseInt(count) || 0,
            limit: parseInt(count) || 0,
          },
        });

        return new NextResponse(null, { status: 200 });
      } catch (error: any) {
        return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
      }
    }

    // case "checkout.session.completed":{
    //   const session = await stripe.subscriptions.retrieve(
    //     session.subscription as string
    //   );



    // }

    case "invoice.payment_failed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const { userId } = subscription.metadata;

      try {
        // Delete user subscription and API limits if payment failed
        await prismadb.userSubscription.delete({
          where: {
            userId: userId,
          },
        });

        await prismadb.userApiLimit.delete({
          where: {
            userId: userId,
          },
        });

        console.log(`Payment failed for user: ${userId} and their data has been deleted`);
        return new NextResponse(null, { status: 200 });
      } catch (error: any) {
        return new NextResponse(`Failed Payment Handling Error: ${error.message}`, { status: 200 });
      }
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      const { userId } = subscription.metadata;

      try {
        // Delete the user's subscription and API limit on subscription deletion
        await prismadb.userSubscription.delete({
          where: {
            userId: userId,
          },
        });

        await prismadb.userApiLimit.delete({
          where: {
            userId: userId,
          },
        });

        console.log(`Subscription deleted for user: ${userId} and their data has been deleted`);
        return new NextResponse(null, { status: 200 });
      } catch (error: any) {
        return new NextResponse(`Subscription Deletion Error: ${error.message}`, { status: 200 });
      }
    }

    case "refund.created": {
        
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
