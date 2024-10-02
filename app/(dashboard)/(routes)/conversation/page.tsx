import { auth } from "@clerk/nextjs/server";
import ConversationPage from "./ConversionClient";
import prismadb from "@/lib/prismadb";


const page =async () => {
  console.log("@23",);
  const { userId } = auth();

    if (!userId) {
        return false;
    }
    
  const
    userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });
  console.log({
    userSubscription
  })
  

  return (
    <>
      <ConversationPage userSubscription={userSubscription}></ConversationPage>
    </>
  );
};

export default page;
