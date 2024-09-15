"use client";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className={cn("text-5xl font-bold text-center mb-12 text-white", font.className)}>
          Terms of Service
        </h1>

        {/* Main Content Wrapper with visible gradient border */}
        <div className="relative p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg">
          {/* Inner white box */}
          <div className="bg-white p-10 rounded-lg">
            {/* Content */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">1. Introduction</h2>
            <p className="mb-8 text-gray-600">
              Welcome to Ultimail.ai! These Terms of Service govern your use of our website and services. 
              By accessing or using the site, you agree to comply with and be bound by these terms. 
              Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">2. Use of Services</h2>
            <p className="mb-8 text-gray-600">
              You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, 
              restrict, or inhibit anyone else's use and enjoyment of the site.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">3. Account Registration</h2>
            <p className="mb-8 text-gray-600">
              To use certain features of the site, you may need to register for an account. 
              You must provide accurate, complete, and up-to-date information during registration.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">4. Termination of Service</h2>
            <p className="mb-8 text-gray-600">
              We reserve the right to terminate or suspend your access to our services at any time, 
              without notice, for any reason, including if you breach these Terms of Service.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">5. Limitation of Liability</h2>
            <p className="mb-8 text-gray-600">
              In no event shall Ultimail.ai or its affiliates be liable for any indirect, incidental, 
              special, or consequential damages arising out of your use of the services.
            </p>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">6. Changes to Terms</h2>
            <p className="mb-8 text-gray-600">
              We reserve the right to modify these terms at any time. You are responsible for reviewing 
              the terms regularly. Continued use of the site constitutes acceptance of any changes.
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

export default TermsOfService;
