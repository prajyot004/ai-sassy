"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Globe, FileText, Users, PenTool } from 'react-feather'; // Import Feather Icons

const features = [
  {
    title: 'AI-Powered Email Generation',
    topLeft: '50% Faster Emails',
    description: 'Draft emails in half the time with our AI engine.',
    icon: <Mail size={42} className="text-white" />, // Email Icon
  },
  {
    title: 'Sound Like A Human',
    topLeft: 'Human-Like Writing Style',
    description: 'AI writes emails that sound professional and natural.',
    icon: <User size={42} className="text-white" />, // User Icon (as a placeholder for "human")
  },
  {
    title: '5 Unique Tones',
    topLeft: 'Five Distinct Tones',
    description: 'Choose between different writing styles based on the context.',
    icon: <PenTool size={42} className="text-white" />, // Pen Tool Icon
  },
  {
    title: 'Multilingual Support',
    topLeft: 'Write in Multiple Languages',
    description: 'Support for various languages for global outreach.',
    icon: <Globe size={42} className="text-white" />, // Globe Icon
  },
  {
    title: 'Custom Templates',
    topLeft: 'Tailored Email Templates',
    description: 'Create personalized email templates for any scenario.',
    icon: <FileText size={42} className="text-white" />, // File Text Icon
  },
  {
    title: 'Collaborative Editing',
    topLeft: 'Real-Time Collaboration',
    description: 'Work together on email drafts in real-time with team members.',
    icon: <Users size={42} className="text-white" />, // Users Icon
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const borderVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current; // Copy ref to a local variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Use the locally scoped ref
      }
    };
  }, []);

  return (
    <div id="features" className="py-16 bg-black text-center text-white relative">
      {/* White line above title */}
      <div className="absolute top-4 left-0 w-full h-px bg-white" style={{ left: '-100vw', width: 'calc(100vw + 2 * 100vw)' }} />

      {/* Title Section */}
      <motion.h2
        className="text-5xl font-bold mb-12 text-white relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        What Sets Us Apart
      </motion.h2>

      {/* Features Section */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-8"
        initial="hidden"
        animate={isVisible ? "visible" : ""}
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-8 bg-black rounded-lg shadow-lg relative text-left hover:shadow-2xl transition duration-300 ease-in-out flex flex-col justify-between items-center h-80" // Fixed height for consistency
          >
            {/* Animated border with rounded corners */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial="hidden"
              animate="visible"
              variants={borderVariants}
            >
              <motion.rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                rx="10"  
                ry="10"  
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Content */}
            <div className="flex items-center justify-center mb-4">
              {feature.icon}
              <div className="text-center ml-4">
                <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="text-md text-gray-300 mt-2">{feature.description}</p>
              </div>
            </div>

            {/* Purple Text - Moved to center and made smaller */}
            <div className="text-4xl gradient-text mt-6 font-bold text-center">
              {feature.topLeft}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
