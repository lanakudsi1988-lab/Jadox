'use client';
import { useState } from 'react';

export default function GlobalAIDashboard() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [includeGoogleData, setIncludeGoogleData] = useState(true);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: prompt.trim(),
          fetchGoogleContext: includeGoogleData 
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'حدث خطأ في معالجة البيانات');

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0b0f19', color: '#fff', minHeight: '100vh', padding: '25px', fontFamily: 'sans-serif', direction: 'rtl', textAlign: 'right' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ borderBottom: '2px solid #1f2937', paddingBottom: '15px', fontSize: '26px', color: '#3b82f6', textAlign: 'center' }}>تطبيق الذكاء الاصطناعي العالمي 🌍🖼️</h1>
        
        {/* لوحة تحكم باقة بيريوم */}
        <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>الحساب والاشتراك:</h2>
          {isPremium ? (
            <span style={{ background: '#f59e0b', color: '#000', padding: '6px 16px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block' }}>🌟 عضوية بيريوم نشطة</span>
          ) : (
            <div>
              <p style={{ color: '#9ca3af', marginBottom: '15px', fontSize: '14px' }}>أنت على الخطة العادية. اشترك لفتح ميزات السيرفر العالمي الفائق.</p>
              <button onClick={() => setIsPremium(true)} style={{ background: 'linear-gradient(to right, #f59e0b, #ea580c)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>الترقية إلى Premium (9$/شهرياً)</button>
            </div>
          )}
        </div>

        {/* محرك صناعة الصور المتصل بغوغل */}
        <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>اصنع صورتك الآن 🎨</h2>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* خيار جلب معلومات غوغل */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#10b981', cursor: 'pointer' }}>
              <input type="checkbox" checked={includeGoogleData} onChange={(e) => setIncludeGoogleData(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              ربط توليد الصور بأحدث معلومات وبحث Google المباشر 🌐
            </label>

            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب وصفاً بالإنجليزية (مثال: Real-time look of Tokyo under snow)..."
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #374151', background: '#1f2937', color: '#fff', boxSizing: 'border-box' }}
              maxLength={400}
              required
            />
            
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
              {loading ? 'جاري قراءة بيانات Google وتوليد الصورة...' : 'توليد الصورة الذكية 🖼️'}
            </button>
          </form>

          {error && <p style={{ marginTop: '15px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '6px', fontSize: '14px' }}>{error}</p>}
          
          {imageUrl && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ color: '#10b981', fontSize: '14px', marginBottom: '10px' }}>تم الصنع بنجاح طبقاً لأحدث البيانات المحللة! تم الحفظ 📥</p>
              <img src={imageUrl} alt="AI Output" style={{ maxWidth: '100%', borderRadius: '8px', border: '2px solid #3b82f6', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
