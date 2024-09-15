// components/footer.tsx
"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 relative">
      {/* White Line Above */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-white"
        style={{ left: '-100vw', width: 'calc(100vw + 2 * 100vw)' }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Links Section */}
          <div className="flex space-x-6">
            <Link href="#features" className="hover:text-gray-300 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#pricing" className="hover:text-gray-300 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#FAQs" className="hover:text-gray-300 transition-colors duration-300">
              FAQs
            </Link>
          </div>

          {/* Copyright Section */}
          <div>
            <p className={cn("text-sm text-center", font.className)}>
              © 2024 Ultimail.ai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
