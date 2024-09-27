"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" p-2 bg-black flex items-center  justify-between shadow-md fixed top-0 left-0 right-0 z-50">
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

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Navbar Links */}
      <div className={`flex-col md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link href="#features" className="text-white hover:text-gray-300 transition-colors duration-300">
          Product
        </Link>
        <Link href="#pricing" className="text-white hover:text-gray-300 transition-colors duration-300">
          Pricing
        </Link>
        <Link href="#faqs" className="text-white hover:text-gray-300 transition-colors duration-300">
          FAQs
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-4 py-2 transition-colors duration-300 text-sm"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* White line beneath the navbar */}
      <div className="absolute left-0 w-full h-px bg-white" style={{ top: '60px', left: '-100vw', width: 'calc(100vw + 2 * 100vw)' }} />
    </nav>
  );
};
