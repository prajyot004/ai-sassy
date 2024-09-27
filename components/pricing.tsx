"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

const pricingPlans = [
  {
    title: "Basic",
    price: "Free",
    frequency: "per month",
    stripePriceId: null,
    features: ["5 Emails Per Month", "Limited Storage", "Community Support", "Basic File Sharing"],
    isPro: false,
  },
  {
    title: "Premium",
    price: "$9.99",
    count: 100,
    frequency: "per month",
    stripePriceId: process.env.NEXT_PUBLIC_PREMIUM,
    features: [
      "100 Emails per month",
      "50 GB Storage",
      "Priority Email Support",
      "Enhanced File Sharing",
      "File Version History (30 days)",
    ],
    isPro: false,
  },
  {
    title: "Ultimate",
    price: "$29.99",
    count: 300,
    frequency: "per month",
    stripePriceId: process.env.NEXT_PUBLIC_ULTIMATE,
    features: [
      "300 Emails per month",
      "Unlimited Storage",
      "24/7 Dedicated Support",
      "Advanced File Sharing & Permissions",
      "File Version History (400 Emails Worth)",
      "Premium Security Features",
    ],
    isPro: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const handleSubscribe = async (plan: any) => {
  try {
    console.log(plan);
    if (plan.price === "Free") {
      window.alert("This is a free plan; you don't need to subscribe.");
      return;
    }

    // Stripe payment API
    const response = await axios.post(`/api/stripe?plan=${plan.stripePriceId}`, {
      plan,
    });
    console.log("Stripe API response:", response.data);

    const { url } = response.data;
    if (url) {
      window.location.href = url;
    } else {
      throw new Error("No URL returned from the Stripe API.");
    }
  } catch (err: any) {
    window.location.href = window.origin + "/sign-up";
    console.log(err.message);
  }
};

const Pricing = () => {
  return (
    <div id="pricing" className="relative min-h-screen py-20 bg-black flex flex-col items-center px-4">
      {/* White bar */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-white"
        style={{ left: "-100vw", width: "calc(100vw + 2 * 100vw)" }}
      />
      <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 md:mb-12 text-center">Pricing Made Simple</h2>
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto pricing-plan-wrapper"
          >
            <div className="pricing-plan-content text-center">
              <h3 className="text-xl font-medium text-white mb-4">{plan.title}</h3>
              <p className="text-3xl md:text-4xl text-white font-bold mb-2">{plan.price}</p>
              <span className="text-white text-sm mb-6 block">{plan.frequency}</span>
              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-white text-lg">
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant="premium"
                onClick={() => handleSubscribe(plan)}
              >
                Upgrade
                <Zap className="w-4 h-4 ml-2 fill-white" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Pricing;
