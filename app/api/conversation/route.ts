// @ts-nocheck
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

import { checkSubscription } from "@/lib/subscription"; 
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!openai.apiKey) {
      return NextResponse.json({ error: "OpenAI API Key not configured" }, { status: 500 });
    }

    if (!messages) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }
    
     const freeTrial = await checkApiLimit(); 
    const isPro = await checkSubscription(); 

    if (!freeTrial && !isPro) { 
      return new NextResponse("Free trial has expired.", { status: 403 });
    } 
    
    if (!isPro) { 
      await increaseApiLimit(); 
    }

    // Simplicity instructions
    const instructions = [
      { role: "system", content: "You are a helpful assistant that writes simple, clear, and concise emails." },
      { role: "user", content: `Write a simple email with a ${messages[1]?.content?.length || "neutral"} tone from ${messages[2]?.content} to ${messages[3]?.content}. The email should be direct, easy to understand, and include the following content: ${messages[4]?.content}` }
    ];
    
    const allMessages = [...instructions, ...messages];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: allMessages
    });

    console.log("OpenAI response:", response);

    return NextResponse.json(response);
  } catch (error:any) {
    console.log("[CONVERSATION_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
