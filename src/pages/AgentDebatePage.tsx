import React, { useState } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/api-client';

interface Message {
  agent: string;
  avatar: string;
  message: string;
  type: 'tma' | 'rtsi' | 'msci';
}

interface SetupInfo {
  ticker: string;
  name: string;
  price: number;
  day_change: number;
  day_change_pct: number;
}

interface Consensus {
  verdict: string;
  average_score: number;
  explanation: string;
  recommendation: string;
}

export const AgentDebatePage: React.FC = () => {
  const [ticker, setTicker] = useState('RELIANCE');
  const [modelType, setModelType] = useState('linear-regression');
  const [isAuditing, setIsAuditing] = useState(false);
  
  const [setup, setSetup] = useState<SetupInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [consensus, setConsensus] = useState<Consensus | null>(null);

  const startAudit = async () => {
    const sym = ticker.trim().toUpperCase();
    if (!sym) {
      toast.error('Please enter a ticker symbol');
      return;
    }

    setIsAuditing(true);
    setSetup(null);
    setMessages([]);
    setConsensus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/agent-debate/${sym}`);
      if (!res.ok) throw new Error('Symbol not found or ML service offline');
      const data = await res.json();

      // Start simulated sequential streaming of agent messages
      setSetup(data.setup);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { ...data.agent_tma, type: 'tma' }]);
      }, 800);

      setTimeout(() => {
        setMessages(prev => [...prev, { ...data.agent_rtsi, type: 'rtsi' }]);
      }, 2000);

      setTimeout(() => {
        setMessages(prev => [...prev, { ...data.agent_msci, type: 'msci' }]);
      }, 3200);

      setTimeout(() => {
        setConsensus(data.consensus);
        setIsAuditing(false);
        toast.success(`AI audit complete for ${sym}`);
      }, 4400);

    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Audit failed');
      setIsAuditing(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-b1 pb-4">
        <h2 className="text-xl font-bold">🤖 Multi-Agent AI Audit Desk</h2>
        <p className="text-xs text-t2 mt-0.5">Simulate real-time qualitative deliberations between quantitative algorithms</p>
      </div>

      {/* Input console */}
      <div className="surface-2 border border-b1 rounded-2xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-t2 mb-1.5 uppercase">Audit Ticker</label>
            <input 
              value={ticker}
              onChange={e => setTicker(e.target.value)}
              className="w-full surface-3 border border-b1 rounded-xl px-3.5 py-2.5 text-t0 text-sm font-semibold outline-none focus:border-brand transition-colors"
              placeholder="e.g. RELIANCE, TCS, INFY"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-t2 mb-1.5 uppercase">Machine Learning Model</label>
            <select
              value={modelType}
              onChange={e => setModelType(e.target.value)}
              className="w-full surface-3 border border-b1 rounded-xl px-3 py-2.5 text-t0 text-sm font-semibold outline-none cursor-pointer focus:border-brand transition-colors"
            >
              <option value="linear-regression">Linear Regression Forecaster (Scikit-Learn)</option>
              <option value="random-forest">Random Forest Regressor (Ensemble)</option>
              <option value="arima">ARIMA/Prophet Temporal model</option>
            </select>
          </div>
          <button 
            disabled={isAuditing}
            onClick={startAudit}
            className="h-10 bg-brand text-white text-sm font-bold rounded-xl active:scale-[0.98] transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isAuditing ? 'Auditing Telemetry...' : 'Deploy AI Agent Audit'}
          </button>
        </div>
      </div>

      {/* Audit telemetry panel */}
      {setup && (
        <div className="surface-2 border border-b1 rounded-2xl p-4 text-xs font-mono text-t2 flex flex-wrap gap-x-6 gap-y-2">
          <div>DEPLOYED AGENT SURVEILLANCE FOR: <strong className="text-t1 font-sans">{setup.name} ({setup.ticker})</strong></div>
          <div>PRICE: <strong className="text-t1">₹{setup.price.toFixed(2)}</strong></div>
          <div className={setup.day_change >= 0 ? 'text-up' : 'text-down'}>
            CHANGE: {setup.day_change >= 0 ? '+' : ''}{setup.day_change.toFixed(2)} ({setup.day_change_pct.toFixed(2)}%)
          </div>
          <div>SURVEILLANCE MODE: <strong className="text-brand">REAL-TIME FORECAST</strong></div>
        </div>
      )}

      {/* Dialogue terminal */}
      {messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((msg, i) => {
            const agentColor = 
              msg.type === 'tma' ? 'border-l-[#00d4ff] bg-[rgba(0,212,255,0.02)]' :
              msg.type === 'rtsi' ? 'bg-[rgba(6,182,212,0.02)] border-l-[#06b6d4]' :
              'bg-[rgba(16,217,138,0.02)] border-l-[#10d98a]';
              
            const nameColor = 
              msg.type === 'tma' ? 'text-[#00d4ff]' :
              msg.type === 'rtsi' ? 'text-[#06b6d4]' :
              'text-[#10d98a]';

            const avBg = 
              msg.type === 'tma' ? 'bg-[rgba(0,212,255,0.1)] border-[rgba(0,212,255,0.3)]' :
              msg.type === 'rtsi' ? 'bg-[rgba(6,182,212,0.1)] border-[rgba(6,182,212,0.3)]' :
              'bg-[rgba(16,217,138,0.1)] border-[rgba(16,217,138,0.3)]';

            return (
              <div key={i} className={`flex gap-4 p-4 rounded-xl border border-b1 border-l-4 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 ${agentColor}`}>
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-lg flex-shrink-0 ${avBg}`}>
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${nameColor}`}>
                    {msg.agent}
                  </div>
                  <p className="text-xs text-t1 leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.message }}></p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Consensus rating card */}
      {consensus && (
        <div className={`surface-2 border rounded-2xl p-5 border-t-4 transition-all duration-300 animate-in zoom-in-95 ${
          consensus.verdict.includes('BUY') || consensus.verdict.includes('ACCUMULATE') ? 'border-t-up border-[rgba(16,217,138,0.3)]' : 'border-t-down border-[rgba(255,71,87,0.3)]'
        }`}>
          <div className="text-[11px] tracking-widest font-bold text-t3 uppercase mb-1">Collaborative AI Consensus verdict</div>
          <div className="text-2xl font-black tracking-wide text-t1 mb-2 font-mono">{consensus.verdict}</div>
          <div className="text-xs text-t2 font-medium mb-3">
            Composite AI Strength Score: <strong className="text-brand font-mono text-sm">{consensus.average_score}/100</strong>
          </div>
          <p className="text-xs text-t2 leading-relaxed mb-4">{consensus.explanation}</p>
          <div className="text-xs font-bold text-up">{consensus.recommendation}</div>
        </div>
      )}
    </div>
  );
};
