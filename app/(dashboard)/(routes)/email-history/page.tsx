"use client"; // Ensures this is client-side code

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Transition } from '@headlessui/react';

interface EmailEntry {
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  subject: string;
}

const EmailHistoryPage = () => {
  const [emailHistory, setEmailHistory] = useState<EmailEntry[]>([]);
  const [expandedEmails, setExpandedEmails] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // To track loading state

  useEffect(() => {
    // Ensure localStorage is used only in the browser
    if (typeof window !== 'undefined') {
      const storedEmails = JSON.parse(localStorage.getItem('emailHistory') || '[]') as EmailEntry[];
      setEmailHistory(storedEmails);
    }
    setIsLoading(false); // Mark loading as complete
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedEmails(prevState =>
      prevState.includes(index)
        ? prevState.filter(id => id !== index)
        : [...prevState, index]
    );
  };

  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('emailHistory');
      setEmailHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Email History
        </h1>
        <p className="text-lg text-gray-300">
          Review your previously created emails.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      <div className="w-full max-w-6xl bg-gray-800 shadow-xl rounded-lg p-8">
        {isLoading ? (
          <p className="text-gray-400">Loading email history...</p>
        ) : emailHistory.length > 0 ? (
          <ul>
            {emailHistory.slice().reverse().map((email, index) => (
              <li key={index} className="mb-4">
                <div className="p-6 bg-gray-700 rounded-lg shadow-md flex justify-between items-start transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">From: <span className="text-white">{email.sender}</span></p>
                    <p className="text-sm text-gray-300">To: <span className="text-white">{email.receiver}</span></p>
                    <p className="text-sm text-gray-300">Subject: <span className="text-white">{email.subject}</span></p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(email.timestamp).toLocaleString()}</p>
                  </div>
                  <button
                    className="ml-4 p-2 bg-gradient-to-r from-indigo-500 via-blue-600 to-teal-500 text-white rounded-full hover:from-indigo-600 hover:via-blue-700 hover:to-teal-600 transition-all duration-300"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedEmails.includes(index) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                <Transition
                  show={expandedEmails.includes(index)}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="mt-2 p-6 bg-gray-700 rounded-lg shadow-inner">
                    <p className="text-gray-200 whitespace-pre-line">{email.content}</p>
                  </div>
                </Transition>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            You have not created any emails yet. Start a new conversation to create your first email.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailHistoryPage;
