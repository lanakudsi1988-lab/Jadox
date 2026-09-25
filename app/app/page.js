import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ background: '#0b0f19', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', direction: 'rtl', padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#3b82f6', fontWeight: 'bold' }}>تطبيق الذكاء الاصطناعي العالمي 🌍</h1>
      <p style={{ color: '#9ca3af', marginBottom: '30px', fontSize: '16px', textAlign: 'center' }}>أهلاً بك في منصة صناعة الصور الاحترافية المتصلة ببحث Google المباشر.</p>
      
      <Link href="/dashboard" style={{ background: 'linear-gradient(to right, #3b82f6, #1d4ed8)', color: '#fff', padding: '14px 35px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)', display: 'inline-block' }}>
        الدخول إلى لوحة التحكم والتوليد 🚀
      </Link>
    </div>
  );
}
