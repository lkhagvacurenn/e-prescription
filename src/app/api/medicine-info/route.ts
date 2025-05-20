// app/api/medicine-info/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { medicineName } = await req.json();

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Та эмийн талаар эмчийн зөвлөгөө мэт ойлгомжтой хэлээр дэлгэрэнгүй мэдээлэл өгдөг туслах юм.',
        },
        {
          role: 'user',
          content: `Надад ${medicineName} эмийн талаар дэлгэрэнгүй мэдээлэл өг.`,
        },
      ],
    }),
  });

  const json = await openaiRes.json();
  const reply = json.choices?.[0]?.message?.content || 'Хариулт олдсонгүй.';

  return NextResponse.json({ reply });
}
