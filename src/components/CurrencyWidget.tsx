import React from 'react';

export const CurrencyWidget: React.FC = () => {
  const rates = [
    { name: 'USD/INR', rate: 83.42, change: '+0.15%', up: true },
    { name: 'EUR/INR', rate: 90.28, change: '+0.32%', up: true },
    { name: 'GBP/INR', rate: 105.45, change: '-0.08%', up: false },
    { name: 'JPY/INR', rate: 0.5632, change: '+0.12%', up: true },
  ];

  return (
    <div className="surface-2 border border-b1 rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-bold">💱 Currency Rates</div>
        <span className="text-xs px-2 py-1 rounded bg-brand-dim text-brand font-semibold">LIVE</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {rates.map((r) => (
          <div key={r.name} className="surface-3 border border-b0 rounded-lg p-3 text-center">
            <div className="text-xs font-semibold text-t2 mb-1">{r.name}</div>
            <div className="font-mono text-sm font-bold">{r.rate.toFixed(2)}</div>
            <div className={`text-xs font-mono mt-1 ${r.up ? 'text-up' : 'text-down'}`}>
              {r.up ? '▲' : '▼'} {r.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};