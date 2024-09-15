// components/Accordion.tsx
"use client";

import { useState } from "react";

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-xl font-semibold text-white">{question}</h2>
        <span className="text-white">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
