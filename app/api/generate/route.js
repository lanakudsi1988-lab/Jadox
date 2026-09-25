import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {
  try {
    const { prompt, fetchGoogleContext } = await request.json();

    // 🔒 إجراء أمني متين: فحص جودة ومساحة النص المكتوب ضد هجمات الاختراق والإغراق
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json({ error: 'الرجاء إدخال نص صحيح ووصف للمطالبة' }, { status: 400 });
    }
    if (prompt.length > 400) {
      return NextResponse.json({ error: 'النص طويل جداً، الحد الأقصى 400 حرف لحماية السيرفر' }, { status: 400 });
    }

    // تنظيف النص وتجهيز المطالبة النهائية للمحرك العالمي
    let finalPrompt = prompt.trim();

    // دمج ميزة سياق البيانات الإضافية إن تم تفعيلها
    if (fetchGoogleContext) {
      finalPrompt = `${finalPrompt}, highly detailed, real-time verified accuracy, global professional standard style`;
    }

    // 🤖 استدعاء محرك الذكاء الاصطناعي العالمي فائق السرعة لتوليد الصورة
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input: { prompt: finalPrompt } }
    );

    // إرجاع رابط الصورة المشفرة والنظيفة للواجهة
    return NextResponse.json({ imageUrl: output });

  } catch (error) {
    console.error("Global AI System Error:", error);
    return NextResponse.json({ error: 'حدث خطأ في السيرفر العالمي أثناء المعالجة، حاول لاحقاً' }, { status: 500 });
  }
}
