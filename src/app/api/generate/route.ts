import { NextResponse } from 'next/server';

const WORKER_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent";
const API_KEY = "AIzaSyBsRrKR8O_JTveL0XGpbenQxsHL7E33szI"; // Ideally in process.env

export async function POST(req: Request) {
    try {
        const { type, content, context } = await req.json();

        let prompt = "";

        if (type === 'title') {
            prompt = `Assess the following blog post draft and generate 3 creative, engaging, and minimal titles for it. Return ONLY the titles, separated by a newline, with no numbering or quotes.\n\nDraft Content:\n${content.substring(0, 3000)}`;
        } else if (type === 'refine') {
            const { mode } = context; // 'grammar', 'shorten', 'professional'
            let instruction = "Improve the grammar and flow of this text.";
            if (mode === 'shorten') instruction = "Make this text more concise and punchy.";
            if (mode === 'professional') instruction = "Make this text sound more professional and authoritative.";
            if (mode === 'expand') instruction = "Expand this text with more details and descriptive language."; // specific handling if needed

            prompt = `${instruction}\n\nText:\n"${content}"\n\nReturn ONLY the improved text.`;
        } else if (type === 'summary') {
            prompt = `Summarize the following blog post in 3-4 concise, engaging sentences. Capture the main argument and key takeaways.\n\nBlog Post:\n${content.substring(0, 5000)}`;
        } else if (type === 'chat') {
            const { question } = context;
            prompt = `You are a helpful reading assistant for this blog post. Answer the user's question based strictly on the content provided below.\n\nBlog Post Content:\n${content.substring(0, 5000)}\n\nUser Question: "${question}"\n\nReturn a helpful, friendly answer.`;
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const response = await fetch(`${WORKER_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return NextResponse.json({ error: "AI Service Error" }, { status: 500 });
        }

        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        return NextResponse.json({ result: generatedText.trim() });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
