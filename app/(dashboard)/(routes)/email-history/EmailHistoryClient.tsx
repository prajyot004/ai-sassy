"use client";

import { useState } from "react";
import { Heading } from "@/components/heading";
import { Mail, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EmailHistoryEntry {
  id: string;
  userId: string;
  receiver: string;
  content: string;
  tone: string;
  length: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EmailHistoryClientProps {
  initialEmails: EmailHistoryEntry[];
}

export const EmailHistoryClient = ({ initialEmails }: EmailHistoryClientProps) => {
  const [emails, setEmails] = useState<EmailHistoryEntry[]>(initialEmails);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/email-history/${id}`);
      setEmails(emails.filter(email => email.id !== id));
      toast.success("Email deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete email");
    }
  };

  if (!emails || emails.length === 0) {
    return (
      <div>
        <Heading
          title="Email History"
          description="View and manage your email history"
          icon={Mail}
          iconColor="text-gray-700"
          bgColor="bg-gray-700/10"
        />
        <div className="px-4 lg:px-8 mt-4">
          <Card className="p-8">
            <div className="text-center text-gray-500">
              No emails in history
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading
        title="Email History"
        description="View and manage your email history"
        icon={Mail}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      <div className="px-4 lg:px-8 space-y-4 mt-4">
        {emails.map((email) => (
          <Card key={email.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold mb-2">To: {email.receiver}</div>
                <div className="text-sm text-gray-500 mb-2">
                  Tone: {email.tone} | Length: {email.length}
                </div>
                <div className="text-sm whitespace-pre-wrap">{email.content}</div>
                <div className="text-xs text-gray-400 mt-2">
                  Created: {email.createdAt.toLocaleString()}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(email.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
