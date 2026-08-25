import React, { useState } from 'react';
import { TradingChart } from '@/components/TradingChart';

export const ChartPage: React.FC = () => {
  const [tickerInput, setTickerInput] = useState('RELIANCE.NS');
  const [activeTicker, setActiveTicker] = useState('RELIANCE.NS');

  const handleApply = () => {
    if (tickerInput.trim()) {
      setActiveTicker(tickerInput.trim().toUpperCase());
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 overflow-hidden">
      <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif mb-1 text-t0">TradingView Chart</h1>
          <p className="text-xs text-t2">Interactive OHLCV charting with live tick simulation via WebSockets.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="e.g. INFY.NS, AAPL"
            className="surface-3 border border-b1 rounded-lg px-3 py-1.5 text-sm text-t0 outline-none transition-colors focus:border-brand w-48"
          />
          <button 
            onClick={handleApply}
            className="px-4 py-1.5 bg-brand text-primary-foreground rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95">
            Load Chart
          </button>
        </div>
      </div>

      <div className="flex-1 surface-2 border border-b1 rounded-2xl overflow-hidden p-2">
        <TradingChart ticker={activeTicker} />
      </div>
    </div>
  );
};
