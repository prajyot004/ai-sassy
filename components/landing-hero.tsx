"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import MiniForm from '@/components/miniform'; // Import the MiniForm component

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative w-full   bg-black pt-20"> {/* Added padding-top */}
      <div className="absolute inset-0">
        {/* Top Triangle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500" />
        {/* Bottom Triangle Black */}
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-12 text-white font-bold font-poppins">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8 flex-1 text-center md:text-left">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-4">
            <h1>Build AI-Powered Emails That</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              <TypewriterComponent
                options={{
                  strings: [
                    "Create Impact.", 
                    "Sound Like You", 
                    "Build Connections"
                  ], 
                  autoStart: true, 
                  loop: true,
                  cursor: '|'
                }}
              />
            </div>
          </div>

          <div className="text-sm md:text-xl font-light text-gray-400">
            Next Generation Machine Learning Technology To Build Emails for You.
          </div>
          
          <div>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button variant="premium" className="md:text-lg py-3 px-6 md:py-4 md:px-8 rounded-full font-semibold transition-transform transform hover:scale-105">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>

         {/* Right Content */}
         <div className="flex flex-col items-center justify-center flex-1 mt-10 md:mt-0 md:pl-10">
          <div className="text-2xl font-bold text-white mb-4 text-center">Next-Gen AI Email Generator</div>
          <MiniForm className="w-full max-w-md md:max-w-2xl" />
        </div>
      </div>
    </div>
  );
};
