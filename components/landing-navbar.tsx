"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-2 bg-black flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative h-8 w-8">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
              className="object-contain"
            />
          </div>
          <h1 className={cn("text-xl font-bold text-white", font.className)}>
            ultimail.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        <Link href="#features" className="text-white hover:text-gray-300 transition-colors duration-300">
          Product
        </Link>
        <Link href="#pricing" className="text-white hover:text-gray-300 transition-colors duration-300">
          Pricing
        </Link>
        <Link href="#faqs" className="text-white hover:text-gray-300 transition-colors duration-300">
        FAQs
        </Link>
      </div>
      <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
        <Button
          variant="premium"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-4 py-2 transition-colors duration-300 text-sm"
        >
          Get Started
        </Button>
      </Link>
      
      {/* White line beneath the navbar */}
      <div className="absolute left-0 w-full h-px bg-white" style={{ top: '60px', left: '-100vw', width: 'calc(100vw + 2 * 100vw)' }} />
    </nav>
  );
};
