import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IndexData {
  name: string;
  value: string;
  change: string;
  up: boolean;
}

interface SectorData {
  sector: string;
  relative_strength: number;
  average_change_pct: number;
  average_sentiment: number;
}

interface DiscussedAsset {
  ticker: string;
  name: string;
  price: number;
  change: string;
  buzz: string;
  velocity: string;
  bullish_ratio: number;
  driver: string;
}

interface Influencer {
  handle: string;
  reach: string;
  stance: string;
  post: string;
}

export const SurveillancePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchSurveillance();
  }, []);

  const fetchSurveillance = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/market-surveillance');
      if (!res.ok) throw new Error('Failed to load surveillance data');
      const d = await res.json();
      setData(d);
    } catch (e) {
      toast.error('Could not connect to local ML surveillance service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-t3 text-sm font-semibold">
        📡 Fetching real-time market surveillance data...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-down text-sm font-bold">
        ⚠️ Local Machine Learning Surveillance Service is offline. Start the service.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Header telemetry summary */}
      <div className="flex justify-between items-center border-b border-b1 pb-4">
        <div>
          <h2 className="text-xl font-bold">📡 Real-Time Market Surveillance</h2>
          <p className="text-xs text-t2 mt-0.5">Multi-layer analysis covering index telemetry, sectors, and social trends</p>
        </div>
        <button onClick={fetchSurveillance} className="px-3.5 py-1.5 surface-2 border border-b1 hover:border-brand rounded-lg text-xs font-bold transition-all active:scale-95">
          🔄 Refresh Feed
        </button>
      </div>

      {/* Indices Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.indices?.map((idx: IndexData, i: number) => (
          <div key={i} className={`surface-2 border rounded-2xl p-4 transition-all hover:scale-[1.01] ${idx.up ? 'border-[rgba(16,217,138,0.15)]' : 'border-[rgba(255,71,87,0.15)]'}`}>
            <div className="text-[11px] text-t2 font-bold tracking-wider">{idx.name}</div>
            <div className="text-lg font-bold font-mono mt-1">{idx.value}</div>
            <div className={`text-xs font-semibold font-mono mt-0.5 ${idx.up ? 'text-up' : 'text-down'}`}>
              {idx.change}
            </div>
          </div>
        ))}
      </div>

      {/* MMI & Sector matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
        {/* MMI */}
        <div className="surface-2 border border-b1 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-t2 mb-4">Market Mood Index (MMI)</h3>
            <div className="flex items-center justify-center py-6 relative">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-brand font-mono">{data.mmi_score}%</div>
                <div className="text-xs font-bold text-up uppercase tracking-widest mt-1">{data.mmi_zone}</div>
              </div>
            </div>
          </div>
          <div className="border-t border-b0 pt-4 space-y-2.5 text-xs text-t2">
            <div className="flex justify-between"><span>Advances / Declines:</span><strong className="text-t1 font-mono">{data.advances} / {data.declines}</strong></div>
            <div className="flex justify-between"><span>MSCI Inflow Index:</span><strong className="text-up font-mono">+{data.msci_flow_score}%</strong></div>
            <p className="text-[11px] italic mt-2">MMI tracks Greed and Fear metrics, showing bullish structural supports at current levels.</p>
          </div>
        </div>

        {/* Sector Strength Matrix */}
        <div className="surface-2 border border-b1 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-t2 mb-3">Sector Relative Strength Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-b1 text-t3 font-bold uppercase tracking-wider">
                  <th className="py-2">Sector</th>
                  <th className="py-2">Strength Index</th>
                  <th className="py-2 text-right">Avg Change</th>
                  <th className="py-2 text-right">Sentiment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-b0 font-medium">
                {data.sector_matrix?.map((sec: SectorData, idx: number) => (
                  <tr key={idx} className="hover:bg-[rgba(255,255,255,0.01)]">
                    <td className="py-2.5 font-bold text-t1">{sec.sector}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold w-6">{sec.relative_strength}</span>
                        <div className="h-1.5 w-24 bg-b1 rounded-full overflow-hidden">
                          <div className="h-full bg-brand rounded-full" style={{ width: `${sec.relative_strength}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className={`py-2.5 text-right font-mono ${sec.average_change_pct >= 0 ? 'text-up' : 'text-down'}`}>
                      {sec.average_change_pct >= 0 ? '+' : ''}{sec.average_change_pct}%
                    </td>
                    <td className="py-2.5 text-right text-brand font-mono">{sec.average_sentiment}% Bullish</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Discussed Assets */}
      <div className="surface-2 border border-b1 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-t2 mb-3">Most Discussed Assets (NSE)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-b1 text-t3 font-bold uppercase tracking-wider">
                <th className="py-2">Ticker</th>
                <th className="py-2">Company Name</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Change</th>
                <th className="py-2 text-right">Mentions</th>
                <th className="py-2 text-right">Velocity</th>
                <th className="py-2 text-right">Bullish Ratio</th>
                <th className="py-2">Key Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-b0 font-medium font-mono">
              {data.discussed_assets?.map((asset: DiscussedAsset, idx: number) => (
                <tr key={idx} className="hover:bg-[rgba(255,255,255,0.01)] text-t2">
                  <td className="py-2.5 text-t1 font-bold font-sans">{asset.ticker}</td>
                  <td className="py-2.5 font-sans">{asset.name}</td>
                  <td className="py-2.5 text-right text-t1">₹{asset.price.toFixed(2)}</td>
                  <td className={`py-2.5 text-right ${asset.change.startsWith('+') ? 'text-up' : 'text-down'}`}>{asset.change}</td>
                  <td className="py-2.5 text-right">{asset.buzz}</td>
                  <td className="py-2.5 text-right text-brand font-bold">{asset.velocity}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>{asset.bullish_ratio}%</span>
                      <div className="h-1 w-10 bg-b1 rounded-full overflow-hidden">
                        <div className="h-full bg-brand" style={{ width: `${asset.bullish_ratio}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-t1 font-sans font-medium">{asset.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Influencers */}
      <div className="surface-2 border border-b1 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-t2 mb-4">Influencer Sentiment Watch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.influencers?.map((inf: Influencer, idx: number) => (
            <div key={idx} className="p-4 bg-[rgba(255,255,255,0.01)] border border-b1 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[13px] text-t1">{inf.handle}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  inf.stance === 'Bullish' ? 'bg-[rgba(16,217,138,0.1)] text-up' :
                  inf.stance === 'Bearish' ? 'bg-[rgba(255,71,87,0.1)] text-down' :
                  'bg-[rgba(255,181,71,0.1)] text-brand'
                }`}>{inf.stance}</span>
              </div>
              <p className="text-xs text-t2 font-medium italic">"{inf.post}"</p>
              <div className="text-[10px] text-t3 font-bold text-right">{inf.reach} followers</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
