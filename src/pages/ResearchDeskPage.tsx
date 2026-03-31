import React, { useState, useRef, useEffect } from 'react';
import { DB } from '@/data/stocks';
import { streamDeepResearch } from '@/lib/streamChat';
import { AIResponseRenderer } from '@/components/AIResponseRenderer';
import { downloadReportPdf, markdownToHtml } from '@/lib/exportPdf';
import { Menu, X } from 'lucide-react';
import { toast } from 'sonner';

interface ChatMsg { role: 'user' | 'ai'; content: string; }

interface ModeField {
  id: string; label: string; placeholder?: string; w?: string;
  type?: 'text' | 'select' | 'textarea'; opts?: string[];
}

interface Mode {
  id: string; num: string; ic: string; name: string; tag: string; pf?: boolean;
  desc: string; fields: ModeField[]; chips: string[]; system: string;
  runLabel: string; buildQuery: (vals: Record<string, string>) => string;
}

const MODES: Mode[] = [
  {id:'full',num:'1',ic:'📋',name:'Full Analysis',tag:'Wall St. equity report',
    desc:'Comprehensive equity research: business model, competitive moat, financials, SEBI filings, risks, and a final BUY/HOLD/SELL verdict with price targets.',
    fields:[{id:'f_ticker',label:'Ticker',placeholder:'e.g. RELIANCE',w:'140px'},{id:'f_price',label:'Price (₹)',placeholder:'e.g. 2948',w:'120px'}],
    chips:['Full: RELIANCE','Full: INFY','Full: TCS','Full: TATAMOTORS'],
    system:`You are a senior equity analyst at FinSignal Capital specialising in Indian markets (NSE/BSE). Date: Mar 2026. NIFTY 50: 24,835. RBI Repo: 6.5%. Provide a comprehensive equity research report. Use bold section headers: BUSINESS MODEL → COMPETITIVE MOAT → FINANCIAL HEALTH → SEBI & CORPORATE FILINGS → KEY RISKS → VALUATION → VERDICT (BUY/HOLD/SELL with price target, stop-loss, confidence %). Under 500 words. End with: "This is not financial advice."`,
    runLabel:'Run Full Analysis ✦',
    buildQuery:v=>`Full equity research report for ${v.f_ticker} at ₹${v.f_price}. Cover: Business Model → Moat → Financials → SEBI → Risks → Valuation → Verdict with target price.`},
  {id:'health',num:'2',ic:'🔬',name:'Financial Health',tag:'5-year forensic audit',
    desc:'Deep-dive into 5 years of financials: revenue trends, margins, FCF quality, debt structure, and return ratios.',
    fields:[{id:'h_ticker',label:'Ticker',placeholder:'e.g. HDFCBANK',w:'140px'}],
    chips:['Health: RELIANCE','Health: TCS','Health: HDFCBANK'],
    system:`You are a forensic financial analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Analyse 5-year financial health. Bold headers: REVENUE GROWTH (5yr CAGR) → NET INCOME TREND → FREE CASH FLOW QUALITY → MARGINS (EBITDA, Net) → DEBT & LEVERAGE → RETURN ON EQUITY → HEALTH VERDICT (STRONG/MODERATE/WEAK). Under 400 words.`,
    runLabel:'Run Health Audit ✦',
    buildQuery:v=>`5-year financial health audit for ${v.h_ticker}.`},
  {id:'moat',num:'3',ic:'🏰',name:'Moat Analysis',tag:'Competitive durability',
    desc:'Rate competitive advantages across 5 dimensions: brand, network effects, switching costs, cost advantages, and IP.',
    fields:[{id:'m_ticker',label:'Ticker',placeholder:'e.g. TCS',w:'140px'},{id:'m_peers',label:'Competitors',placeholder:'e.g. INFY, WIPRO',w:'180px'}],
    chips:['Moat: TCS vs INFY','Moat: RELIANCE','Moat: HDFCBANK'],
    system:`You are a competitive strategy analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Rate moat across 5 dimensions (1-10 each): BRAND STRENGTH → NETWORK EFFECTS → SWITCHING COSTS → COST ADVANTAGES → IP/PATENTS. Compare vs peers. Overall moat score /50. Durability assessment. Under 400 words.`,
    runLabel:'Run Moat Analysis ✦',
    buildQuery:v=>`Moat analysis for ${v.m_ticker} vs peers (${v.m_peers}).`},
  {id:'valuation',num:'4',ic:'💰',name:'Valuation',tag:'P/E · DCF · Multiples',
    desc:'Multi-method valuation: P/E vs peers, DCF estimate, EV/EBITDA, and fair value range.',
    fields:[{id:'v_ticker',label:'Ticker',placeholder:'e.g. INFY',w:'140px'},{id:'v_price',label:'Price (₹)',placeholder:'e.g. 1842',w:'120px'}],
    chips:['Valuation: INFY','Valuation: RELIANCE','Valuation: TCS'],
    system:`You are a valuation specialist at FinSignal Capital. Indian equities. Date: Mar 2026. Multi-method valuation. Bold headers: P/E ANALYSIS → DCF ESTIMATE → INDUSTRY MULTIPLES → VALUATION VERDICT (Undervalued/Fair/Overvalued, bull/base/bear targets). Under 400 words.`,
    runLabel:'Run Valuation ✦',
    buildQuery:v=>`Multi-method valuation for ${v.v_ticker} at ₹${v.v_price}.`},
  {id:'risk',num:'5',ic:'⚠️',name:'Risk Analysis',tag:'Probability × impact',
    desc:'Map all risk categories, rank by probability × impact, flag permanent impairment risks.',
    fields:[{id:'r_company',label:'Company',placeholder:'e.g. ADANIENT',w:'140px'},{id:'r_thesis',label:'Thesis',placeholder:'e.g. Infra growth play',w:'200px'}],
    chips:['Risk: ADANIENT','Risk: TATAMOTORS','Risk: ZOMATO'],
    system:`You are a risk analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Comprehensive risk analysis. Bold headers: MACRO RISKS → DISRUPTION RISKS → COMPETITION RISKS → REGULATORY RISKS → RISK RANKING → PERMANENT IMPAIRMENT FLAGS. Under 400 words.`,
    runLabel:'Run Risk Analysis ✦',
    buildQuery:v=>`Risk analysis for ${v.r_company}. Thesis: "${v.r_thesis}".`},
  {id:'growth',num:'6',ic:'📈',name:'Growth Potential',tag:'TAM · Pipeline',
    desc:'Size the TAM, evaluate expansion, product pipeline, and build 3 growth scenarios.',
    fields:[{id:'g_company',label:'Company',placeholder:'e.g. BHARTIARTL',w:'140px'},{id:'g_position',label:'Position',placeholder:'e.g. #2 telecom',w:'180px'}],
    chips:['Growth: BHARTIARTL','Growth: ZOMATO','Growth: WAAREE'],
    system:`You are a growth equity analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Bold headers: TOTAL ADDRESSABLE MARKET → EXPANSION OPPORTUNITIES → PRODUCT PIPELINE → GROWTH SCENARIOS (Low/Mid/High) → VERDICT. Under 400 words.`,
    runLabel:'Run Growth Analysis ✦',
    buildQuery:v=>`Growth analysis for ${v.g_company} (${v.g_position}).`},
  {id:'debate',num:'7',ic:'⚔️',name:'Bull vs Bear',tag:'Structured debate',
    desc:'Two analysts debate with data — one bullish, one bearish. Scorecard and decisive winner.',
    fields:[{id:'d_ticker',label:'Ticker',placeholder:'e.g. BAJFINANCE',w:'140px'},{id:'d_price',label:'Price (₹)',placeholder:'e.g. 7242',w:'120px'}],
    chips:['Debate: BAJFINANCE','Debate: DMART','Debate: ZOMATO'],
    system:`You are a debate moderator at FinSignal Capital. Two senior analysts — bull vs bear. Indian equities. Date: Mar 2026. Bold headers: BULL CASE (3 args) → BEAR CASE (3 counterarguments) → BULL REBUTTAL → BEAR REBUTTAL → SCORECARD (1-5 each) → WINNER. Under 500 words. End with: "This is not financial advice."`,
    runLabel:'Run Debate ✦',
    buildQuery:v=>`Bull vs Bear for ${v.d_ticker} at ₹${v.d_price}.`},
  {id:'megastock',num:'8',ic:'🔭',name:'Mega Analysis',tag:'10-dimension deep-dive',
    desc:'Complete 10-point analysis covering every dimension of a stock for serious investors.',
    fields:[{id:'ms_ticker',label:'Ticker',placeholder:'e.g. RELIANCE',w:'130px'},{id:'ms_sector',label:'Sector',placeholder:'e.g. Energy',w:'120px'},{id:'ms_risk',label:'Risk',type:'select',opts:['Conservative','Moderate','Aggressive'],w:'120px'},{id:'ms_timeline',label:'Timeline',type:'select',opts:['Short (<1yr)','Medium (1-3yr)','Long (3+yr)'],w:'140px'}],
    chips:['Mega: RELIANCE · Long','Mega: TCS · Medium','Mega: ICICIBANK · Long'],
    system:`You are the world's best financial analyst at FinSignal Capital. Indian equities. Date: Mar 2026. NIFTY 24,835. RBI Repo 6.5%. 10-point analysis with bold headers: 1. BUSINESS MODEL 2. FINANCIAL HEALTH 3. COMPETITIVE MOAT 4. GROWTH CATALYSTS & HEADWINDS 5. VALUATION VS PEERS 6. TECHNICAL ANALYSIS 7. INSIDER & INSTITUTIONAL OWNERSHIP 8. BEAR CASE (as detailed as bull case — no optimism bias) 9. BULL CASE 10. RECOMMENDATION (BUY/HOLD/SELL, specific entry price, specific exit/target price, stop-loss, position size %). Under 700 words. End with: "This is not financial advice."`,
    runLabel:'Run Mega Analysis ✦',
    buildQuery:v=>`Mega 10-point analysis for ${v.ms_ticker} (${v.ms_sector}). Risk: ${v.ms_risk}. Timeline: ${v.ms_timeline}.`},
];

const PF_MODES: Mode[] = [
  {id:'budget',num:'9',ic:'💰',name:'Budget Builder',tag:'Zero-based plan',pf:true,
    desc:'Zero-based monthly budget with expense cuts and automation plan.',
    fields:[{id:'b_income',label:'Income',placeholder:'₹85,000',w:'140px'},{id:'b_expenses',label:'Expenses',placeholder:'Rent ₹18k, EMIs ₹12k',w:'200px'},{id:'b_debts',label:'Debts',placeholder:'Home loan ₹40L',w:'160px'},{id:'b_goals',label:'Goals',placeholder:'Emergency fund',w:'160px'}],
    chips:['Budget: ₹80k · High EMIs','Budget: ₹1.2L · Lifestyle'],
    system:`You are a CFP specialising in Indian personal finance. ₹. Date: Mar 2026. Zero-based budget. Bold headers: INCOME → ESSENTIALS (<50%) → FLEXIBLE → GOALS → 50/30/20 + 5 CUTS → AUTOMATION → TOP 3 ACTIONS. Under 500 words.`,
    runLabel:'Build Budget ✦',
    buildQuery:v=>`Budget. Income: ${v.b_income}. Expenses: ${v.b_expenses}. Debts: ${v.b_debts}. Goals: ${v.b_goals}.`},
  {id:'debt',num:'10',ic:'⛓️',name:'Debt Eliminator',tag:'Snowball vs Avalanche',pf:true,
    desc:'Fastest path to debt-free with month-by-month plan.',
    fields:[{id:'dt_debts',label:'Your Debts',placeholder:'Home loan ₹35L @8.5%, CC ₹80k @36%',type:'textarea',w:'360px'},{id:'dt_extra',label:'Extra (₹/mo)',placeholder:'₹5,000',w:'130px'}],
    chips:['Debt: CC + personal loan','Debt: Home loan prepay'],
    system:`You are a debt elimination strategist. Indian context. ₹. RBI repo 6.5%. Date: Mar 2026. Bold headers: DEBT LIST → INTEREST ANALYSIS → SNOWBALL VS AVALANCHE → BEST METHOD → FASTER SCENARIOS → MONTH-BY-MONTH PLAN → 5 RULES. Under 500 words.`,
    runLabel:'Build Debt Roadmap ✦',
    buildQuery:v=>`Debt elimination. Debts: ${v.dt_debts}. Extra: ${v.dt_extra}.`},
  {id:'beginner',num:'11',ic:'🌱',name:'Beginner Plan',tag:'First-time investor',pf:true,
    desc:'Simple, automated portfolio for first-time investors with specific fund recommendations.',
    fields:[{id:'bp_amount',label:'Monthly Amount (₹)',placeholder:'₹10,000',w:'150px'},{id:'bp_knowledge',label:'Knowledge Level',type:'select',opts:['Complete beginner','Some reading','Basic understanding'],w:'170px'}],
    chips:['Beginner: ₹5k/mo','Beginner: ₹15k/mo'],
    system:`You are a beginner investment advisor. Indian context. ₹. Date: Mar 2026. Bold headers: BEST ACCOUNT TYPE → FIRST INVESTMENTS (specific ticker symbols, not just "index funds") → AUTOMATION SETUP (zero ongoing decisions) → REALISTIC RETURNS (5yr, 10yr, 20yr — not best-case). Under 400 words. End with: "This is not financial advice."`,
    runLabel:'Build My Plan ✦',
    buildQuery:v=>`Beginner plan. Monthly: ${v.bp_amount}. Knowledge: ${v.bp_knowledge}.`},
  {id:'snapshot',num:'12',ic:'📸',name:'Financial Snapshot',tag:'CFP health check',pf:true,
    desc:'Complete financial health diagnosis with prioritized action plan.',
    fields:[{id:'fs_income',label:'Income',placeholder:'₹80,000',w:'130px'},{id:'fs_expenses',label:'Expenses',placeholder:'₹55,000',w:'130px'},{id:'fs_debts',label:'Debts',placeholder:'₹20L home loan',w:'160px'},{id:'fs_savings',label:'Savings',placeholder:'₹3L FD',w:'130px'}],
    chips:['Snapshot: ₹80k · High debt','Snapshot: ₹1.5L · Mid-life'],
    system:`You are a certified financial planner. Indian context. ₹. Date: Mar 2026. Bold headers: FINANCIAL HEALTH RATIO → TOP LEAKS (specific, not "reduce spending") → URGENT PRIORITIES (ranked by urgency, not size) → ACTION PLAN (executable this week). Under 400 words.`,
    runLabel:'Run Snapshot ✦',
    buildQuery:v=>`Financial snapshot. Income: ${v.fs_income}. Expenses: ${v.fs_expenses}. Debts: ${v.fs_debts}. Savings: ${v.fs_savings}.`},
  {id:'retirement',num:'13',ic:'🏖️',name:'Retirement Check',tag:'Gap analysis',pf:true,
    desc:'Retirement readiness assessment with gap analysis and catch-up plan.',
    fields:[{id:'rt_age',label:'Age',placeholder:'34',w:'70px'},{id:'rt_retireage',label:'Retire At',placeholder:'60',w:'90px'},{id:'rt_corpus',label:'Current Savings',placeholder:'PF ₹6L, NPS ₹2L',w:'200px'},{id:'rt_income',label:'Need (₹/mo)',placeholder:'₹75,000',w:'130px'}],
    chips:['Retirement: 30yo · ₹60k saved','Retirement: 45yo · Behind'],
    system:`You are a retirement specialist. Indian context. EPF/NPS/PPF. ₹. Date: Mar 2026. Inflation 6%. Equity return 12%. Bold headers: INCOME TARGET → PROJECTED CORPUS → GAP ANALYSIS → CATCH-UP OPTIONS → TAX DIVERSIFICATION → CONFIDENCE SCORE (1-10). Under 500 words.`,
    runLabel:'Check Retirement ✦',
    buildQuery:v=>`Retirement readiness. Age: ${v.rt_age}. Retire at: ${v.rt_retireage}. Savings: ${v.rt_corpus}. Need: ${v.rt_income}/mo.`},
];

const ALL_MODES = [...MODES, ...PF_MODES];

export const ResearchDeskPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState('full');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [chatInput, setChatInput] = useState('');

  const currentMode = ALL_MODES.find(m => m.id === activeMode) || MODES[0];
  const isPF = !!currentMode.pf;

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => { setFieldValues({}); }, [activeMode]);

  const setField = (id: string, val: string) => setFieldValues(prev => ({ ...prev, [id]: val }));

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setChatInput('');

    let accumulated = '';
    try {
      // Add empty AI message to stream into
      setMessages(prev => [...prev, { role: 'ai', content: '' }]);
      
      await streamDeepResearch({
        messages: [
          ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' as const : 'user' as const, content: m.content })),
          { role: 'user' as const, content: text }
        ],
        mode: isPF ? 'macro-outlook' : 'stock-deep-dive',
        onDelta: (chunk) => {
          accumulated += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'ai', content: accumulated };
            return updated;
          });
        },
        onDone: () => setLoading(false),
        onError: (err) => {
          toast.error(err);
          setLoading(false);
        },
      });
    } catch (e: any) {
      console.error('Chat error:', e);
      toast.error('Analysis failed. Please try again.');
      setLoading(false);
    }
  };

  const runMode = () => {
    const hasEmpty = currentMode.fields.some(f => !fieldValues[f.id]?.trim());
    if (hasEmpty) { alert('Please fill in all fields.'); return; }
    sendMessage(currentMode.buildQuery(fieldValues));
  };

  const chipRun = (chip: string) => {
    const parts = chip.split(':');
    if (parts.length > 1 && currentMode.fields.length > 0) {
      const ticker = parts[1].trim().split(' ')[0].split('·')[0].trim();
      setField(currentMode.fields[0].id, ticker);
      const stock = DB.find(s => s.s === ticker);
      if (stock && currentMode.fields.length > 1) {
        const f2 = currentMode.fields[1];
        if (f2.id.includes('price')) setField(f2.id, String(stock.p));
        if (f2.id.includes('mc')) setField(f2.id, stock.mc);
      }
    }
    sendMessage(chip);
  };

  const SidebarContent = () => (
    <>
      <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-t3 px-2 pt-1.5 pb-1">Analysis Modes</div>
      {MODES.map(m => (
        <button key={m.id} onClick={() => { setActiveMode(m.id); setSidebarOpen(false); }}
          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all text-left w-full active:scale-[0.98]
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
        <button key={m.id} onClick={() => { setActiveMode(m.id); setSidebarOpen(false); }}
          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all text-left w-full active:scale-[0.98]
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
    </>
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[210px] surface-0 border-r border-b1 overflow-y-auto flex-shrink-0 p-3 flex flex-col gap-1">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-background/80" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[260px] surface-0 border-r border-b1 overflow-y-auto p-3 flex flex-col gap-1 animate-fade-in-up z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-t0">Analysis Modes</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-t2"><X size={18} /></button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mode Header + Fields */}
        <div className="px-3 md:px-5 py-3 border-b border-b1 surface-0 flex-shrink-0">
          <div className="flex items-start gap-2.5 mb-2 md:mb-3">
            {/* Mobile sidebar toggle */}
            <button onClick={() => setSidebarOpen(true)} className="md:hidden mt-0.5 text-t2 p-1 rounded hover:surface-2">
              <Menu size={18} />
            </button>
            <span className="text-xl mt-0.5">{currentMode.ic}</span>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[14px] md:text-[15px] text-t0">{currentMode.name}</div>
              <div className="text-[10px] md:text-[11px] text-t2 mt-0.5 leading-relaxed line-clamp-2">{currentMode.desc}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            {currentMode.fields.map(f => (
              <div key={f.id} className="flex flex-col">
                <label className="text-[9px] md:text-[10px] font-semibold text-t2 tracking-wide mb-1">{f.label}</label>
                {f.type === 'select' ? (
                  <select value={fieldValues[f.id] || ''} onChange={e => setField(f.id, e.target.value)}
                    className="surface-3 border border-b1 rounded-lg px-2.5 py-2 text-t0 text-[12px] outline-none transition-colors focus:border-brand appearance-none cursor-pointer"
                    style={{ width: `min(${f.w || '140px'}, 100%)`, maxWidth: '100%' }}>
                    <option value="">Select...</option>
                    {f.opts?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea value={fieldValues[f.id] || ''} onChange={e => setField(f.id, e.target.value)}
                    placeholder={f.placeholder}
                    className="surface-3 border border-b1 rounded-lg px-2.5 py-2 text-t0 text-[12px] outline-none transition-colors focus:border-brand resize-vertical"
                    style={{ width: `min(${f.w || '240px'}, 100%)`, maxWidth: '100%', minHeight: '48px', maxHeight: '100px', lineHeight: '1.5' }} />
                ) : (
                  <input value={fieldValues[f.id] || ''} onChange={e => setField(f.id, e.target.value)}
                    placeholder={f.placeholder}
                    className="surface-3 border border-b1 rounded-lg px-2.5 py-2 text-t0 text-[12px] outline-none transition-colors focus:border-brand"
                    style={{ width: `min(${f.w || '140px'}, 100%)`, maxWidth: '100%' }} />
                )}
              </div>
            ))}
            <button onClick={runMode} disabled={loading}
              className={`px-3 md:px-4 py-2 rounded-lg font-bold text-[11px] md:text-[12px] border-none transition-all hover:opacity-90 active:scale-95 disabled:opacity-35 self-end mb-px
                ${isPF ? 'bg-fs-green text-[#071A0E]' : 'bg-brand text-primary-foreground'}`}>
              {currentMode.runLabel}
            </button>
          </div>
        </div>

        {/* Chat */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-3 md:px-5 py-4 md:py-5 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-t3">
              <div className="text-4xl md:text-5xl opacity-30">{currentMode.ic}</div>
              <div className="text-sm font-bold text-t2">{currentMode.name}</div>
              <div className="text-[11px] md:text-xs text-t3 text-center max-w-sm leading-relaxed">
                Fill in the fields above and click run, or type a query below.
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2.5 max-w-[95%] md:max-w-[88%] animate-fade-in-up ${m.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 md:w-[30px] md:h-[30px] rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] md:text-xs font-bold
                ${m.role === 'ai' ? 'bg-brand text-primary-foreground' : 'surface-4 text-t1 border border-b2'}`}>
                {m.role === 'ai' ? 'AI' : 'U'}
              </div>
              {m.role === 'ai' ? (
                <div className="px-3 py-2.5 md:px-4 md:py-3 rounded-[14px] rounded-tl-[4px] surface-2 border border-b1 min-w-0 flex-1">
                  <AIResponseRenderer content={m.content} loading={loading && i === messages.length - 1} />
                </div>
              ) : (
                <div className="px-3 py-2.5 md:px-3.5 md:py-3 rounded-[14px] rounded-tr-[4px] bg-brand-dim border border-[hsl(var(--brand-glow))] text-t0 text-[12px] md:text-[13px] leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Chips */}
        <div className="px-3 md:px-5 py-2 flex gap-1.5 flex-wrap border-t border-b1 flex-shrink-0 surface-0 overflow-x-auto">
          {currentMode.chips.map(chip => (
            <button key={chip} onClick={() => chipRun(chip)}
              className={`px-2.5 md:px-3 py-1.5 rounded-full border text-[10px] font-semibold transition-all whitespace-nowrap active:scale-95 flex-shrink-0
                ${isPF ? 'border-b1 text-t2 hover:border-fs-green hover:text-fs-green hover:bg-fs-green-dim' : 'border-b1 text-t2 hover:border-brand hover:text-brand hover:bg-brand-dim'}`}>
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="px-3 md:px-5 py-2.5 md:py-3 border-t border-b1 flex-shrink-0">
          <div className="flex gap-2 surface-2 border border-b2 rounded-xl px-3 py-2 transition-all focus-within:border-brand items-end">
            <textarea ref={textareaRef} value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput); } }}
              className="flex-1 bg-transparent border-none outline-none text-t0 text-[13px] resize-none leading-relaxed max-h-[80px] placeholder:text-t3"
              placeholder={`Ask about ${currentMode.name.toLowerCase()}...`} rows={1} />
            <button onClick={() => sendMessage(chatInput)} disabled={!chatInput.trim() || loading}
              className="w-8 h-8 bg-brand rounded-lg text-primary-foreground text-[14px] flex items-center justify-center flex-shrink-0 transition-all hover:opacity-85 active:scale-95 disabled:opacity-30">↑</button>
          </div>
        </div>
      </div>
    </div>
  );
};
