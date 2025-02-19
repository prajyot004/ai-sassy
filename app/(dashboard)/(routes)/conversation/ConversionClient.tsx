"use client";
import axios from "axios";
import * as z from "zod";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from "react";
import { Heading } from "@/components/heading";
import { Mail } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { useProModal } from '@/hooks/use-pro-modal';

import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const formSchema = z.object({
  sender: z.string().nonempty("Sender is required"),
  receiver: z.string().nonempty("Receiver is required"),
  content: z.string().nonempty("Content is required"),
  tone: z.enum(["Formal", "Informal", "Professional", "Casual"], {
    errorMap: () => ({ message: "Tone is required" }),
  }),
  length: z.enum(["Short", "Medium", "Long"], {
    errorMap: () => ({ message: "Length is required" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ConversionPageProps {
  userSubscription: any;
}

const ConversationPage = ({ userSubscription }: ConversionPageProps) => {
  const modal = useProModal();
  const router = useRouter();

  const getURLParams = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return {
        content: params.get('content') || '',
        tone: params.get('tone') as "Formal" | "Informal" | "Professional" | "Casual" || "Formal",
        length: params.get('length') as "Short" | "Medium" | "Long" || "Short"
      };
    }
    return null;
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sender: "",
      receiver: "",
      content: "",
      tone: "Formal",
      length: "Short",
    },
  });

  useEffect(() => {
    const params = getURLParams();
    if (params) {
      form.setValue('content', params.content);
      form.setValue('tone', params.tone);
      form.setValue('length', params.length);
    }
  }, [form, getURLParams]);
  
  const [emailContent, setEmailContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (values) => {
    setIsLoading(true);
    setEmailContent(null);

    try {
      await delay(2000);
      console.log("inside conversationPage onsubmit");

      const response = await axios.post("/api/conversation", {
        messages: [
          { role: "system", content: "You are a helpful assistant that generates emails." },
          { role: "user", content: `Write a ${values.length} email with a ${values.tone} tone from ${values.sender} to ${values.receiver} with the following content: ${values.content}` },
        ],
        formData: {
          receiver: values.receiver,
          tone: values.tone,
          length: values.length,
        }
      });

      console.log("API Response:", response);

      if (response.status == 200 && response.statusText == "API LIMIT EXCEDDED") {
        console.log(response.data);
        console.log("Attempting to open proModal");
        modal.onOpen();
        console.log("proModal should now be open");
        return;
      }

      if (response.status === 403) {
        console.log("API limit exceeded");
        toast.error("You have reached your API limit. Please upgrade your plan.");
        return;
      }

      if (response.data.choices[0]?.message?.content && userSubscription !== null) {
        const reduceCountResponse = await axios.post("/api/reduce");

        if (reduceCountResponse.data.status) {
          console.log("API count reduced successfully");
        } else {
          console.error("Failed to reduce API count");
        }
      }

      const generatedContent = response.data.choices[0]?.message?.content || "No content received from API";
      setEmailContent(generatedContent);
    } catch (error: any) {
      console.error("Error occurred:", error); 

      if (error?.response?.status === 403) {
        modal.onOpen();
      } else {
        console.log("in else "+JSON.stringify(error))
        toast.error("Something went wrong :(", error);
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }, [userSubscription, modal, router]);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('formData');
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      form.reset(parsedFormData);

      // Automatically submit the form
      form.handleSubmit(onSubmit)();

      // Clear the formData from sessionStorage
      sessionStorage.removeItem('formData');

      //let emailHistory=JSON.parse( localStorage.getItem("emailHistory"));
      //localStorage.setItem('emailHistory',JSON.stringify(emailHistory));
      console.log("Email sent")
    }
  }, [form, onSubmit]);
// useEffect(()=>{
//         let emailHistory=JSON.parse( localStorage.getItem("emailHistory"));
//         if( Array.isArray(emailHistory) && emailHistory.length > 0){
//           emailHistory.push(emailContent);
//           localStorage.setItem('emailHistory',JSON.stringify(emailHistory));
//         }else{
//           let emailHistory=[emailContent]
//           localStorage.setItem('emailHistory',JSON.stringify(emailHistory));
//         }
// },[emailContent]);
  return (
    <div>
      {isLoading && <LoadingOverlay message="Generating your email..." />}
      <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-[#1E293B]">
        <div className="w-full max-w-6xl bg-white rounded-3xl p-10 space-y-8 relative border-4 border-transparent bg-clip-border gradient-border">
          <Heading
            title="Email Generator"
            description="Generate professional emails quickly by providing the sender, receiver, content, tone, and length."
            icon={Mail}
            iconColor="text-purple-600"
            bgColor="bg-white"
            titleClass="text-black"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="sender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-lg border-gray-300 bg-white text-black rounded-full shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 w-full"
                        disabled={isLoading}
                        placeholder="Sender's Email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="receiver"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-lg border-gray-300 bg-white text-black rounded-full shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 w-full"
                        disabled={isLoading}
                        placeholder="Receiver's Email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        className="text-lg border border-gray-300 bg-white text-black rounded-3xl shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 w-full"
                        disabled={isLoading}
                        placeholder="Write your message here"
                        {...field}
                        style={{ height: '150px', resize: 'none' }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="tone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        className="text-lg border-gray-300 bg-white text-black rounded-full shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 w-full"
                        disabled={isLoading}
                        {...field}
                      >
                        <option value="Formal">Formal</option>
                        <option value="Informal">Informal</option>
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="length"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        className="text-lg border-gray-300 bg-white text-black rounded-full shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 w-full"
                        disabled={isLoading}
                        {...field}
                      >
                        <option value="Short">Short</option>
                        <option value="Medium">Medium</option>
                        <option value="Long">Long</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="w-full py-3 text-lg bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate Email"}
              </Button>
            </form>
          </Form>

          {isLoading ? (
            <div className="mt-6 p-6 flex justify-center items-center">
              <Loader2 className="animate-spin text-black w-12 h-12" />
            </div>
          ) : emailContent ? (
            <div className="mt-7 p-6 bg-gray-100 border border-gray-300 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-black">Generated Email:</h2>
              <div className="whitespace-pre-line text-black text-lg">{emailContent}</div>
            </div>
          ) : (
            <Empty label="No email generated yet." />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
