import React, { useState } from 'react';

type RiskProfile = 'conservative' | 'moderate' | 'aggressive';

const PLANS: Record<RiskProfile, { title: string; advice: string; assets: { ic: string; n: string; p: number; c: string; w: string }[] }> = {
  conservative: {
    title: 'Conservative Plan', advice: 'Capital preservation priority. Expected annual return: 8–11%.',
    assets: [
      { ic: '🏦', n: 'FD / Bonds', p: 35, c: '#4F6EF7', w: 'HDFC/SBI FD at 7–8% or RBI Floating Rate Bonds.' },
      { ic: '📊', n: 'Debt Mutual Fund', p: 25, c: '#9B6BFF', w: 'Short-duration or liquid funds.' },
      { ic: '📈', n: 'Large-Cap Equity', p: 20, c: '#10D98A', w: 'NIFTY 50 index fund only.' },
      { ic: '🥇', n: 'Gold ETF', p: 15, c: '#FFB547', w: 'Sovereign Gold Bond preferred.' },
      { ic: '💵', n: 'Liquid Fund', p: 5, c: '#06B6D4', w: 'Emergency buffer.' },
    ]
  },
  moderate: {
    title: 'Moderate Plan', advice: 'Balanced growth with managed downside. Expected CAGR: 11–15%.',
    assets: [
      { ic: '📈', n: 'Stocks (Large+Mid)', p: 40, c: '#10D98A', w: '60% large-cap index + 40% quality midcaps.' },
      { ic: '📊', n: 'Hybrid Mutual Fund', p: 25, c: '#9B6BFF', w: 'Flexi-cap or balanced advantage fund.' },
      { ic: '🏦', n: 'FD / Bonds', p: 15, c: '#4F6EF7', w: 'Stability anchor — 7–8% guaranteed.' },
      { ic: '🥇', n: 'Gold ETF', p: 12, c: '#FFB547', w: 'Classic inflation hedge.' },
      { ic: '🌐', n: 'International ETF', p: 5, c: '#06B6D4', w: 'US/global exposure for diversification.' },
      { ic: '💵', n: 'Liquid Buffer', p: 3, c: '#FF4757', w: 'Deploy on 10%+ market corrections.' },
    ]
  },
  aggressive: {
    title: 'Aggressive Plan', advice: 'Maximum growth. Expected CAGR: 16–25%. Only for 5+ year horizon.',
    assets: [
      { ic: '📈', n: 'Stocks (Multi-Cap)', p: 55, c: '#10D98A', w: '12–15 stocks across sectors.' },
      { ic: '🚀', n: 'Small & Micro Cap', p: 20, c: '#FF4757', w: 'High-quality small caps. Max 5% per stock.' },
      { ic: '📊', n: 'Sectoral / Thematic', p: 12, c: '#9B6BFF', w: 'IT, Pharma, or Infrastructure theme fund.' },
      { ic: '🥇', n: 'Gold ETF', p: 8, c: '#FFB547', w: 'Minimum hedge position.' },
      { ic: '💵', n: 'Cash Buffer', p: 5, c: '#06B6D4', w: 'Deploy on 15%+ NIFTY drops.' },
    ]
  },
};

export const AllocatorPage: React.FC = () => {
  const [capital, setCapital] = useState('500000');
  const [horizon, setHorizon] = useState('3');
  const [risk, setRisk] = useState<RiskProfile>('moderate');
  const [showResult, setShowResult] = useState(false);

  const plan = PLANS[risk];
  const cap = parseFloat(capital) || 500000;

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 max-w-[900px] mx-auto w-full">
      <div className="surface-2 border border-b1 rounded-3xl p-6 relative overflow-hidden animate-fade-in-up">
        <div className="absolute -top-20 -right-20 w-[250px] h-[250px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--brand-dim)) 0%, transparent 65%)' }} />
        <div className="flex items-center gap-2.5 mb-2">
          <div className="font-serif text-[22px]">Capital Allocation Framework</div>
          <span className="text-[9px] px-2 py-1 rounded bg-brand-dim text-brand font-bold">AI POWERED</span>
        </div>
        <p className="text-[13px] text-t2 leading-relaxed mb-5 max-w-[580px]">
          Define your investable capital, time horizon, and risk mandate. FinSignal Capital will construct a tailored allocation.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div><div className="text-[11px] text-t2 font-semibold mb-1.5">Total Capital (₹)</div><input value={capital} onChange={e => setCapital(e.target.value)} type="number" className="w-full surface-3 border border-b1 rounded-xl px-3.5 py-2.5 text-t0 text-[13px] outline-none transition-colors focus:border-brand" /></div>
          <div><div className="text-[11px] text-t2 font-semibold mb-1.5">Investment Horizon</div>
            <select value={horizon} onChange={e => setHorizon(e.target.value)} className="w-full surface-3 border border-b1 rounded-xl px-3 py-2.5 text-t0 text-[13px] outline-none transition-colors focus:border-brand appearance-none cursor-pointer">
              <option value="1">Short term — 1 year</option><option value="3">Medium term — 3 years</option><option value="5">Long term — 5+ years</option><option value="10">Very long — 10+ years</option>
            </select>
          </div>
          <div><div className="text-[11px] text-t2 font-semibold mb-1.5">Monthly Income (₹)</div><input className="w-full surface-3 border border-b1 rounded-xl px-3.5 py-2.5 text-t0 text-[13px] outline-none transition-colors focus:border-brand" placeholder="e.g. 80000" /></div>
        </div>
        <div className="text-[11px] text-t2 font-semibold mb-2.5">Risk Profile</div>
        <div className="flex gap-2 mb-4">
          {(['conservative', 'moderate', 'aggressive'] as RiskProfile[]).map(r => (
            <button key={r} onClick={() => setRisk(r)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all
                ${risk === r ? 'bg-brand-dim border-brand text-brand' : 'surface-3 border-b1 text-t2 hover:border-b3 hover:text-t0'}`}>
              {r === 'conservative' ? '🛡️ Conservative' : r === 'moderate' ? '⚖️ Moderate' : '🚀 Aggressive'}
            </button>
          ))}
        </div>
        <button onClick={() => setShowResult(true)} className="w-full py-3.5 bg-brand rounded-xl font-bold text-sm text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px active:translate-y-0">
          Generate Investment Mandate ✦
        </button>
      </div>

      {showResult && (
        <div className="animate-fade-in-up">
          <div className="text-lg font-bold mb-3">{plan.title}</div>
          {/* Segment Bar */}
          <div className="flex rounded-xl overflow-hidden mb-4 h-8">
            {plan.assets.map(a => (
              <div key={a.n} className="flex items-center justify-center text-[10px] font-bold transition-all" style={{ width: `${a.p}%`, background: a.c, color: '#1A0F00' }}>
                {a.p}%
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {plan.assets.map(a => (
              <div key={a.n} className="surface-2 border border-b1 rounded-2xl p-4 transition-all hover:border-b3 hover:-translate-y-px">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${a.c}18` }}>{a.ic}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold">{a.n}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs font-semibold" style={{ color: a.c }}>{a.p}%</span>
                      <span className="font-mono text-xs text-t2">₹{Math.round(cap * a.p / 100).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-t2 leading-relaxed">{a.w}</div>
              </div>
            ))}
          </div>
          <div className="p-4 surface-2 border border-b1 rounded-2xl text-xs text-t2 leading-relaxed">
            <b className="text-t0">Investment Note:</b> {plan.advice} This allocation is calibrated for Indian market conditions (Mar 2026). Rebalance quarterly.
          </div>
        </div>
      )}
    </div>
  );
};
