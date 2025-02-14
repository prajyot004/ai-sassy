// import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import SettingsClient from "./SettingsClient";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const apiLimitCount = await getApiLimitCount();
  const user = await currentUser();

  const serializedUser = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map(email => ({
      emailAddress: email.emailAddress,
      id: email.id,
    })),
    imageUrl: user.imageUrl,
  } : null;

  return (
    <SettingsClient 
      isPro={isPro} 
      apiLimitCount={apiLimitCount} 
      user={serializedUser} 
    />
  );
};

export default SettingsPage;
