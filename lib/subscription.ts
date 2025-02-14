import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const   
 userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    /*select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true, 
      stripePriceId: true, 
    },*/
  });
  // console.log({
  //   userSubscription
  // })
  const   
    UserApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });
  // console.log({
  //   userSubscription,UserApiLimit
  // })
  if (!userSubscription) { 
    return false; 
  }
  const isValid = 
      userSubscription.stripePriceId
      userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now(); 

    return !!isValid;
};