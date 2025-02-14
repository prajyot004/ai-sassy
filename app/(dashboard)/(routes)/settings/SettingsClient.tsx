"use client";

import { Heading } from "@/components/heading";
import { Settings, User, CreditCard, Bell, Shield, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { SubscriptionButton } from "@/components/subscription-button";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "@/components/ui/loader";

interface SettingsClientProps {
  isPro: boolean;
  apiLimitCount: number;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddresses: Array<{
      emailAddress: string;
      id: string;
    }>;
    imageUrl: string;
  } | null;
}

const SettingsClient = ({ isPro, apiLimitCount, user }: SettingsClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const proModal = useProModal();

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onManageSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe/manage");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {(isLoading || loading) && <LoadingOverlay message="Updating settings..." />}
      <div className="container mx-auto py-8 px-4 max-w-5xl space-y-8">
        <Heading
          title="Settings"
          description="Manage account settings and preferences"
          icon={Settings}
          iconColor="text-gray-700"
          bgColor="bg-gray-700/10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Information */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Account Information</h2>
                <Badge variant={isPro ? "default" : "secondary"}>
                  {isPro ? "Pro Plan" : "Free Plan"}
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-base">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-base">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Status</label>
                  <p className="text-base">Active</p>
                </div>
              </div>
            </Card>

            {/* Subscription Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Plan</p>
                    <p className="text-sm text-gray-500">{isPro ? "Pro Plan" : "Free Plan"}</p>
                  </div>
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Current Plan</p>
                    <p className="text-lg font-semibold">{isPro ? "Pro" : "Free"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">API Usage</p>
                    <p className="text-lg font-semibold">{apiLimitCount} requests</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Plan Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      {isPro ? "Unlimited" : "Limited"} API requests
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      Advanced features
                    </li>
                  </ul>
                </div>

                <div>
                  <SubscriptionButton isPro={isPro} />
                  {!isPro && (
                    <p className="text-sm text-gray-500 mt-2">
                      Upgrade to Pro for unlimited access and premium features.
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Billing Notifications */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Notifications</h2>
              <Separator className="my-4" />
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Reminders</p>
                    <p className="text-sm text-gray-500">Get notified before your next payment</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Usage Alerts</p>
                    <p className="text-sm text-gray-500">Receive alerts when approaching API limits</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Updates</p>
                    <p className="text-sm text-gray-500">Stay informed about special offers</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
            {/* Help Section */}
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Need Help?</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Contact our support team for assistance with your account.
              </p>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsClient;
