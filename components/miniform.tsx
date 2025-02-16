"use client";

import { useRouter } from 'next/navigation';
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface MiniFormProps {
  className?: string;
}

const MiniForm: React.FC<MiniFormProps> = ({ className }) => {
  const router = useRouter();
  const formMethods = useForm();
  const { control, getValues, reset } = formMethods;
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const formData = getValues();
      sessionStorage.setItem('formData', JSON.stringify(formData));
      
      // Redirect to conversation page
      await router.push(`/conversation?content=${encodeURIComponent(formData.content)}&tone=${encodeURIComponent(formData.tone)}&length=${encodeURIComponent(formData.length)}`);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('formData');
    if (savedFormData) {
      formMethods.reset(JSON.parse(savedFormData));
    }
  }, [formMethods]);

  return (
    <>
      {isLoading && <LoadingOverlay message="Preparing your email generation..." />}
      <div className={`gradient-border-wrapper ${className}`}>
        <FormProvider {...formMethods}>
          <div className="w-full max-w-7xl mx-auto p-10 bg-black text-white shadow-lg rounded-lg gradient-halo">
            <form className="space-y-6 w-full">
              <FormField
                name="sender"
                control={control}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="sender"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Sender's Email"
                            className="border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-3 px-4 text-lg w-full"
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="receiver"
                control={control}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="receiver"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Receiver's Email"
                            className="border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-3 px-4 text-lg w-full"
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="content"
                control={control}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            placeholder="Email Content"
                            className="border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-3 px-4 text-lg w-full h-40"
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="tone"
                control={control}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="tone"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-3 px-4 text-lg w-full"
                          >
                            <option value="Formal">Formal</option>
                            <option value="Informal">Informal</option>
                            <option value="Professional">Professional</option>
                            <option value="Casual">Casual</option>
                          </select>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="length"
                control={control}
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="length"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-3 px-4 text-lg w-full"
                          >
                            <option value="Short">Short</option>
                            <option value="Medium">Medium</option>
                            <option value="Long">Long</option>
                          </select>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                className="w-full py-3 bg-blue-700 text-white hover:bg-blue-800 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating...
                  </div>
                ) : (
                  "Generate Email"
                )}
              </Button>
            </form>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default MiniForm;
