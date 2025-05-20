import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', // or any other available Together model
      messages: [
        { role: 'system', content: 'You are a helpful pet care assistant.' },
        { role: 'user', content: message }
      ]
    })
  });

  const data = await response.json();
  const botMessage = data.choices?.[0]?.message?.content || 'Sorry, I could not understand.';

  return NextResponse.json({ reply: botMessage });
}
