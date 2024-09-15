"use client";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Accordion from "@/components/Accordion";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const FAQ = () => {
  const faqs = [
    {
      question: "What is Ultimail.ai?",
      answer: "Ultimail.ai is an AI-driven tool designed to automate and enhance email writing for businesses and individuals."
    },
    {
      question: "How can I sign up?",
      answer: "You can sign up by clicking the 'Get Started' button at the top of the page and following the registration process."
    },
    {
      question: "Is there a free version?",
      answer: "Yes! We offer a limited free version. You can upgrade to the premium plan for more features."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime by visiting the 'Billing' section in your account dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className={cn("text-5xl font-bold text-center mb-12 text-white", font.className)}>
          Frequently Asked Questions
        </h1>

        {/* FAQ Accordion List */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-lg shadow-lg">
          <div className="bg-black p-10 rounded-lg">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
