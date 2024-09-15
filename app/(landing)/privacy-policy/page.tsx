"use client";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className={cn("text-5xl font-bold text-center mb-12 text-white", font.className)}>
          Privacy Policy
        </h1>

        {/* Main Content Wrapper with visible gradient border */}
        <div className="relative p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg">
          {/* Inner white box */}
          <div className="bg-white p-10 rounded-lg">
            {/* Content */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">1. Introduction</h2>
            <p className="mb-8 text-gray-600">
              At Ultimail.ai, we are committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit 
              our website and use our services.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">2. Information We Collect</h2>
            <p className="mb-8 text-gray-600">
              We may collect information about you in a variety of ways. The information we may collect 
              on the site includes personal data, such as your name, email address, and demographic 
              information when you voluntarily provide it to us.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">3. Use of Your Information</h2>
            <p className="mb-8 text-gray-600">
              We may use the information we collect from you to provide, maintain, and improve our 
              services, communicate with you, and prevent fraud and security issues.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">4. Disclosure of Your Information</h2>
            <p className="mb-8 text-gray-600">
              We do not share your personal information with third parties except as necessary to provide 
              our services, comply with legal obligations, or with your consent.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">5. Security of Your Information</h2>
            <p className="mb-8 text-gray-600">
              We take reasonable steps to protect your information from unauthorized access, use, or 
              disclosure. However, no method of transmission over the Internet or electronic storage 
              is 100% secure, and we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">6. Changes to This Privacy Policy</h2>
            <p className="mb-8 text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              updating the "Effective Date" at the bottom of this policy.
            </p>

            <p className="text-center mt-8 text-gray-600">
              <strong>Effective Date:</strong> January 1, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
