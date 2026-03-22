import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) toast.error(error.message);
      } else {
        if (!name.trim()) { toast.error('Please enter your name'); setLoading(false); return; }
        const { error } = await signUp(email, password, name);
        if (error) toast.error(error.message);
        else toast.success('Account created! Check your email to verify.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background" style={{ backgroundImage: 'radial-gradient(hsl(var(--brand)/0.035) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      <div className="w-[440px] max-w-[93vw] surface-1 border border-b2 rounded-3xl p-9 relative overflow-hidden animate-fade-in-up">
        <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--brand-glow)) 0%, transparent 70%)' }} />
        
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M10 2L3 7v6l7 5 7-5V7L10 2z" fill="#031A14"/><path d="M10 6l-4 2.5v5L10 16l4-2.5v-5L10 6z" fill="rgba(255,255,255,0.4)"/><circle cx="10" cy="10" r="2" fill="#031A14"/></svg>
          </div>
          <div>
            <div className="font-serif text-[22px] text-brand">FinSignal Capital</div>
            <div className="text-[11px] text-brand font-semibold tracking-widest uppercase mt-0.5">Institutional Research Platform</div>
          </div>
        </div>

        <h1 className="text-[22px] font-extrabold tracking-tight leading-tight mb-2">
          {isLogin ? 'Welcome back, investor' : 'Create your account'}
        </h1>
        <p className="text-[13px] text-t2 leading-relaxed mb-6">
          {isLogin 
            ? 'Access institutional-grade investment intelligence for the Indian equity market.'
            : 'Join FinSignal Capital for AI-powered research, risk analytics, and portfolio insights — built for Indian investors.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div>
              <label className="text-[11px] font-semibold text-t2 tracking-wide mb-1.5 block">FULL NAME</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full surface-3 border border-b1 rounded-xl px-4 py-3 text-t0 text-[13px] outline-none transition-colors focus:border-brand"
                placeholder="Your full name"
              />
            </div>
          )}
          <div>
            <label className="text-[11px] font-semibold text-t2 tracking-wide mb-1.5 block">EMAIL</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full surface-3 border border-b1 rounded-xl px-4 py-3 text-t0 text-[13px] outline-none transition-colors focus:border-brand"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-t2 tracking-wide mb-1.5 block">PASSWORD</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full surface-3 border border-b1 rounded-xl px-4 py-3 text-t0 text-[13px] outline-none transition-colors focus:border-brand"
              placeholder="Min 6 characters"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3.5 bg-brand border-none rounded-xl font-bold text-sm text-primary-foreground tracking-tight transition-all hover:opacity-90 hover:-translate-y-px active:translate-y-0 disabled:opacity-35"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In →' : 'Create Account →'}
          </button>
        </form>

        <div className="text-center mt-4 text-xs text-t2">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-brand font-semibold hover:underline">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
