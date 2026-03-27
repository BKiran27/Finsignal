import React, { useState, useCallback } from 'react';
import { streamDeepResearch } from '@/lib/streamChat';
import { AIResponseRenderer } from './AIResponseRenderer';
import { toast } from 'sonner';

const CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar', rate: 83.42 },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro', rate: 90.68 },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound', rate: 105.82 },
  { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen', rate: 0.556 },
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar', rate: 54.18 },
  { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar', rate: 61.24 },
  { code: 'CHF', flag: '🇨🇭', name: 'Swiss Franc', rate: 93.48 },
  { code: 'CNY', flag: '🇨🇳', name: 'Chinese Yuan', rate: 11.48 },
  { code: 'SGD', flag: '🇸🇬', name: 'Singapore Dollar', rate: 62.14 },
  { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham', rate: 22.72 },
  { code: 'SAR', flag: '🇸🇦', name: 'Saudi Riyal', rate: 22.24 },
  { code: 'HKD', flag: '🇭🇰', name: 'Hong Kong Dollar', rate: 10.69 },
  { code: 'THB', flag: '🇹🇭', name: 'Thai Baht', rate: 2.38 },
  { code: 'KRW', flag: '🇰🇷', name: 'South Korean Won', rate: 0.0623 },
  { code: 'BRL', flag: '🇧🇷', name: 'Brazilian Real', rate: 16.42 },
  { code: 'RUB', flag: '🇷🇺', name: 'Russian Ruble', rate: 0.91 },
  { code: 'ZAR', flag: '🇿🇦', name: 'South African Rand', rate: 4.58 },
  { code: 'MYR', flag: '🇲🇾', name: 'Malaysian Ringgit', rate: 17.82 },
  { code: 'IDR', flag: '🇮🇩', name: 'Indonesian Rupiah', rate: 0.00528 },
  { code: 'NZD', flag: '🇳🇿', name: 'New Zealand Dollar', rate: 50.24 },
];

export const CurrencyWidget: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [inrAmount, setInrAmount] = useState('1000');

  const shown = expanded ? CURRENCIES : CURRENCIES.slice(0, 8);

  const runCurrencyAnalysis = useCallback(async () => {
    setLoading(true);
    setAnalysis('');
    let acc = '';
    try {
      await streamDeepResearch({
        messages: [{ role: 'user', content: `INR currency analysis: Current USD/INR at 83.42. Analyse INR strength/weakness vs major currencies. Cover RBI policy impact, trade deficit effect, FII flows, and 3-month outlook for INR. Which currencies is INR strengthening against and weakening against?` }],
        mode: 'macro-outlook',
        onDelta: (t) => { acc += t; setAnalysis(acc); },
        onDone: () => setLoading(false),
        onError: (e) => { toast.error(e); setLoading(false); },
      });
    } catch { setLoading(false); }
  }, []);

  return (
    <div className="surface-2 border border-b1 rounded-2xl overflow-hidden animate-fade-in-up">
      <div className="px-4 py-3 border-b border-b0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">💱</span>
          <span className="text-xs font-bold">INR vs World Currencies</span>
        </div>
        <div className="flex gap-2 items-center">
          <input value={inrAmount} onChange={e => setInrAmount(e.target.value)}
            className="surface-3 border border-b1 rounded-lg px-2 py-1 text-[11px] font-mono w-[80px] text-right outline-none focus:border-brand"
            placeholder="₹1000" />
          <button onClick={runCurrencyAnalysis} disabled={loading}
            className="text-[9px] px-2 py-1 rounded bg-brand-dim text-brand font-bold hover:bg-brand/20 transition-all disabled:opacity-40">
            AI Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-b0">
        {shown.map(c => {
          const amt = parseFloat(inrAmount) || 1000;
          const converted = (amt / c.rate).toFixed(c.rate < 1 ? 0 : 2);
          return (
            <div key={c.code} className="surface-1 px-3 py-2.5 hover:surface-2 transition-all cursor-default">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{c.flag}</span>
                <span className="text-[11px] font-bold">{c.code}</span>
              </div>
              <div className="font-mono text-[12px] font-semibold text-t0">₹{c.rate.toFixed(2)}</div>
              <div className="text-[9px] text-t3 font-mono mt-0.5">
                ₹{parseFloat(inrAmount).toLocaleString('en-IN') || '1,000'} = {c.code} {parseFloat(converted).toLocaleString('en-US')}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-3 py-2 border-t border-b0 flex justify-between items-center">
        <button onClick={() => setExpanded(!expanded)}
          className="text-[10px] text-t2 font-semibold hover:text-brand transition-colors">
          {expanded ? '▲ Show less' : `▼ Show all ${CURRENCIES.length} currencies`}
        </button>
        <span className="text-[9px] text-t3 font-mono">Base: INR ₹</span>
      </div>

      {analysis && (
        <div className="border-t border-b0 p-3">
          <div className="surface-3 border border-b0 rounded-xl p-3 max-h-[200px] overflow-y-auto">
            <AIResponseRenderer content={analysis} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};
