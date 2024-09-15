import { Settings } from "lucide-react";
import { Heading } from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscription-button";
import { currentUser } from '@clerk/nextjs/server';

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const user = await currentUser(); // Fetch user data from Clerk

  return (
    <div className="max-w-4xl py-8 space-y-8">
      <Heading
        title="Settings"
        description="Manage your account settings and subscription preferences."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      {/* Account Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
        <p className="text-sm text-gray-500">Manage your account details, email, and password here.</p>
        <div className="text-sm text-gray-700">
          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
        </div>
        {/* Additional account management components can go here */}
      </div>

      {/* Subscription Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Subscription Plan</h2>
        <div className={`text-sm font-medium ${isPro ? 'text-green-600' : 'text-red-600'}`}>
          {isPro ? "You are currently on a Pro plan." : "You are currently on a Free plan."}
        </div>
        <p className="text-sm text-gray-500">
          {isPro
            ? "Enjoy premium features with your Pro subscription."
            : "Upgrade to Pro to unlock additional features."}
        </p>
        <SubscriptionButton isPro={isPro} />
      </div>

      {/* Preferences Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
        <p className="text-sm text-gray-500">Customize your experience and manage notifications.</p>
        {/* Add preferences-related components here */}
      </div>
    </div>
  );
};

export default SettingsPage;
