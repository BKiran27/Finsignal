import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChatMsg {
  role: 'user' | 'ai';
  content: string;
}

const MODES = [
  { id: 'full', ic: '📋', name: 'Full Analysis', tag: 'Wall St. equity report', num: '1' },
  { id: 'health', ic: '🔬', name: 'Financial Health', tag: '5-year forensic audit', num: '2' },
  { id: 'moat', ic: '🏰', name: 'Moat Analysis', tag: 'Competitive durability', num: '3' },
  { id: 'valuation', ic: '💰', name: 'Valuation', tag: 'P/E · DCF · Multiples', num: '4' },
  { id: 'risk', ic: '⚠️', name: 'Risk Analysis', tag: 'Probability × impact', num: '5' },
  { id: 'growth', ic: '📈', name: 'Growth Potential', tag: 'TAM · Pipeline', num: '6' },
];

const PF_MODES = [
  { id: 'budget', ic: '💰', name: 'Budget Builder', tag: 'Zero-based CFP plan', num: '10', pf: true },
  { id: 'debt', ic: '⛓️', name: 'Debt Eliminator', tag: 'Snowball vs Avalanche', num: '12', pf: true },
  { id: 'emergency', ic: '🛟', name: 'Emergency Fund', tag: '3–12 month target', num: '13', pf: true },
  { id: 'retirement', ic: '🏖️', name: 'Retirement Readiness', tag: 'Gap analysis', num: '16', pf: true },
];

export const ResearchDeskPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState('full');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isPF = PF_MODES.some(m => m.id === activeMode);
  const currentMode = [...MODES, ...PF_MODES].find(m => m.id === activeMode) || MODES[0];

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: ChatMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const systemPrompt = `You are a senior equity analyst at FinSignal Capital, specialising in Indian markets (NSE/BSE). Current date: March 2026. NIFTY 50: 24,835. RBI Repo Rate: 6.5%. Provide rigorous, actionable analysis for Indian investors. Use ₹ for all amounts. Be specific with data. Format with bold headers.`;

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: msg }
          ]
        }
      });

      if (error) throw error;

      // Handle streaming response
      if (data && typeof data === 'object' && 'error' in data) {
        throw new Error(data.error);
      }

      const aiContent = typeof data === 'string' ? data : (data?.content || data?.choices?.[0]?.message?.content || 'Analysis complete. Please try a more specific query.');
      setMessages(prev => [...prev, { role: 'ai', content: aiContent }]);
    } catch (e: any) {
      console.error('Chat error:', e);
      // Fallback demo response
      const demoResponse = `**${currentMode.name} — Demo Analysis**\n\nThis is a demo response for the "${msg}" query. To get live AI-powered analysis, the Research Desk edge function needs to be deployed.\n\n**Key Points:**\n• Indian equity markets showing broad strength with NIFTY at 24,835\n• IT sector outperforming with +1.24% today\n• RBI repo rate steady at 6.5% supporting banking sector\n• FII inflows positive at +₹2,340 Cr\n\n**Recommendation:** Enable the AI chat edge function for full institutional-grade analysis.\n\n*FinSignal Capital — Institutional Research Platform*`;
      setMessages(prev => [...prev, { role: 'ai', content: demoResponse }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[210px] surface-0 border-r border-b1 overflow-y-auto flex-shrink-0 p-3 flex flex-col gap-1">
        <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-t3 px-2 pt-1.5 pb-1">Analysis Modes</div>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setActiveMode(m.id)}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all text-left w-full
              ${activeMode === m.id ? 'bg-brand-dim border-[rgba(201,168,76,0.2)] text-brand' : 'border-transparent text-t2 hover:surface-2 hover:text-t0'}`}>
            <span className="text-[15px] flex-shrink-0 w-5 text-center">{m.ic}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] font-semibold leading-tight">{m.name}</div>
              <div className={`text-[9px] mt-0.5 font-medium ${activeMode === m.id ? 'text-brand/60' : 'text-t3'}`}>{m.tag}</div>
            </div>
            <div className={`w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] font-bold font-mono flex-shrink-0
              ${activeMode === m.id ? 'bg-brand text-primary-foreground' : 'surface-3 text-t3'}`}>{m.num}</div>
          </button>
        ))}
        <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-fs-green/70 px-2 pt-3 pb-1">Personal Finance</div>
        {PF_MODES.map(m => (
          <button key={m.id} onClick={() => setActiveMode(m.id)}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all text-left w-full
              ${activeMode === m.id ? 'bg-fs-green-dim border-[rgba(34,197,94,0.25)] text-fs-green' : 'border-transparent text-t2 hover:surface-2 hover:text-t0'}`}>
            <span className="text-[15px] flex-shrink-0 w-5 text-center">{m.ic}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] font-semibold leading-tight">{m.name}</div>
              <div className={`text-[9px] mt-0.5 font-medium ${activeMode === m.id ? 'text-fs-green/60' : 'text-t3'}`}>{m.tag}</div>
            </div>
            <div className={`w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] font-bold font-mono flex-shrink-0
              ${activeMode === m.id ? 'bg-fs-green text-[#071A0E]' : 'surface-3 text-t3'}`}>{m.num}</div>
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mode Header */}
        <div className="px-5 py-3.5 border-b border-b1 surface-0 flex-shrink-0">
          <div className="flex items-start gap-2.5 mb-3">
            <span className="text-xl mt-0.5">{currentMode.ic}</span>
            <div>
              <div className="font-serif text-[15px] text-t0">{currentMode.name}</div>
              <div className="text-[11px] text-t2 mt-0.5 leading-relaxed max-w-[600px]">{currentMode.tag}</div>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-t3">
              <div className="text-5xl opacity-30">{currentMode.ic}</div>
              <div className="text-sm font-bold text-t2">Ask anything about {currentMode.name}</div>
              <div className="text-xs text-t3 text-center max-w-sm leading-relaxed">
                Type your query below or click a quick chip to start. AI analysis powered by FinSignal Capital.
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2.5 max-w-[88%] animate-fade-in-up ${m.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
              <div className={`w-[30px] h-[30px] rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold
                ${m.role === 'ai' ? 'bg-brand text-primary-foreground' : 'surface-4 text-t1 border border-b2'}`}>
                {m.role === 'ai' ? 'AI' : 'U'}
              </div>
              <div className={`px-3.5 py-3 rounded-[14px] text-[13px] leading-relaxed whitespace-pre-wrap
                ${m.role === 'ai' ? 'surface-2 border border-b1 rounded-tl-[4px]' : 'bg-brand-dim border border-[hsl(var(--brand-glow))] rounded-tr-[4px] text-t0'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2.5 animate-fade-in-up">
              <div className="w-[30px] h-[30px] rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold bg-brand text-primary-foreground">AI</div>
              <div className="px-3.5 py-3 rounded-[14px] rounded-tl-[4px] surface-2 border border-b1">
                <div className="flex gap-1 items-center"><div className="w-1.5 h-1.5 bg-t3 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-t3 rounded-full animate-bounce [animation-delay:0.15s]" /><div className="w-1.5 h-1.5 bg-t3 rounded-full animate-bounce [animation-delay:0.3s]" /></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Chips */}
        <div className="px-5 py-2 flex gap-1.5 flex-wrap border-t border-b1 flex-shrink-0 surface-0">
          {(isPF
            ? ['Budget: ₹80k income', 'Debt plan: CC + personal loan', 'Emergency: ₹40k expenses']
            : ['Full Analysis: RELIANCE', 'Moat: TCS', 'Valuation: INFY', 'Risk: ADANIENT']
          ).map(chip => (
            <button key={chip} onClick={() => sendMessage(chip)}
              className={`px-3 py-1.5 rounded-full border text-[10.5px] font-semibold transition-all whitespace-nowrap
                ${isPF ? 'border-b1 text-t2 hover:border-fs-green hover:text-fs-green hover:bg-fs-green-dim' : 'border-b1 text-t2 hover:border-brand hover:text-brand hover:bg-brand-dim'}`}>
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-b1 flex-shrink-0">
          <div className="flex gap-2.5 surface-2 border border-b2 rounded-xl px-3 py-2.5 transition-all focus-within:border-brand focus-within:shadow-[0_0_0_3px_hsl(var(--brand-dim))] items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-t0 text-[13px] resize-none leading-relaxed max-h-[90px] placeholder:text-t3"
              placeholder={`Ask about ${currentMode.name.toLowerCase()}...`}
              rows={1}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className="w-[34px] h-[34px] bg-brand rounded-lg text-primary-foreground text-[15px] flex items-center justify-center flex-shrink-0 transition-all hover:opacity-85 hover:scale-105 disabled:opacity-30 disabled:cursor-default">
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
