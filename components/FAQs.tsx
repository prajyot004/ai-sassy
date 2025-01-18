"use client"; 

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is Ultimail.ai?',
    answer: 'Ultimail.ai is an AI-powered email generation platform that helps you write emails faster and with more accuracy using natural language processing and advanced machine learning algorithms.',
  },
  {
    question: 'How do I sign up?',
    answer: 'Signing up is easy! Just click the "Get Started" button in the top right corner and follow the instructions to create your account.',
  },
  {
    question: 'Is there a free version available?',
    answer: 'Yes, our Basic plan is completely free and includes 15 emails per month along with 5 GB of storage.',
  },
  {
    question: 'Can I upgrade my plan at any time?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings.',
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes, we offer customer support for all plans. Premium and Ultimate plans come with priority and dedicated support, while the Basic plan includes community support.',
  },
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      id="faqs"
      className="px-[24px] py-[4rem] scroll-m-[215px] bg-black text-white relative"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* White line above the FAQ section */}
      <div
        className="absolute top-4 left-0 w-full h-px bg-white"
        style={{ left: '-100vw', width: 'calc(100vw + 2 * 100vw)' }}
      />

      {/* Gradient effect for the FAQ section */}
      <h2 className="text-5xl font-semibold text-center mb-12 moving-gradient-text">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-medium">{faq.question}</h3>
              {expandedIndex === index ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
            <motion.div
              initial={false}
              animate={expandedIndex === index ? 'open' : 'collapsed'}
              variants={{
                open: { opacity: 1, height: 'auto', marginTop: 10 },
                collapsed: { opacity: 0, height: 0, marginTop: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p
                className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg text-lg"
                style={{ color: 'white' }}
              >
                {faq.answer}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Subtle gradient on the background */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background:
            'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(96, 165, 250, 0.3) 100%)',
        }}
      />
    </div>
  );
};

export default FAQ;
