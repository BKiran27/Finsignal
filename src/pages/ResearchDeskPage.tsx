import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DB } from '@/data/stocks';

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
    fields:[{id:'f_ticker',label:'NSE / BSE Ticker',placeholder:'e.g. RELIANCE, INFY',w:'160px'},{id:'f_price',label:'Current Price (₹)',placeholder:'e.g. 2948',w:'140px'}],
    chips:['Full Analysis: RELIANCE','Full Analysis: INFY','Full Analysis: TCS','Full Analysis: TATAMOTORS'],
    system:`You are a senior equity analyst at FinSignal Capital specialising in Indian markets (NSE/BSE). Date: Mar 2026. NIFTY 50: 24,835. RBI Repo: 6.5%. Provide a comprehensive equity research report. Use bold section headers: BUSINESS MODEL → COMPETITIVE MOAT → FINANCIAL HEALTH → SEBI & CORPORATE FILINGS → KEY RISKS → VALUATION → VERDICT (BUY/HOLD/SELL with price target, stop-loss, confidence %). Under 500 words.`,
    runLabel:'Run Full Analysis ✦',
    buildQuery:v=>`Full equity research report for ${v.f_ticker} at ₹${v.f_price}. Cover: Business Model → Moat → Financials → SEBI → Risks → Valuation → Verdict with target price.`},
  {id:'health',num:'2',ic:'🔬',name:'Financial Health',tag:'5-year forensic audit',
    desc:'Deep-dive into 5 years of financials: revenue trends, margins, FCF quality, debt structure, and return ratios.',
    fields:[{id:'h_ticker',label:'NSE / BSE Ticker',placeholder:'e.g. HDFCBANK',w:'160px'}],
    chips:['Health: RELIANCE','Health: TCS','Health: HDFCBANK','Health: BAJFINANCE'],
    system:`You are a forensic financial analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Analyse 5-year financial health. Bold headers: REVENUE GROWTH (5yr CAGR) → NET INCOME TREND → FREE CASH FLOW QUALITY → MARGINS (EBITDA, Net) → DEBT & LEVERAGE → RETURN ON EQUITY → HEALTH VERDICT (STRONG/MODERATE/WEAK). Under 400 words.`,
    runLabel:'Run Health Audit ✦',
    buildQuery:v=>`5-year financial health audit for ${v.h_ticker}. Deliver: Revenue → Profit → FCF → Margins → Debt → ROE → Verdict.`},
  {id:'moat',num:'3',ic:'🏰',name:'Moat Analysis',tag:'Competitive durability',
    desc:'Rate competitive advantages across 5 dimensions: brand, network effects, switching costs, cost advantages, and IP.',
    fields:[{id:'m_ticker',label:'NSE / BSE Ticker',placeholder:'e.g. TCS',w:'160px'},{id:'m_peers',label:'Key Competitors',placeholder:'e.g. INFY, WIPRO, HCL',w:'200px'}],
    chips:['Moat: TCS vs INFY','Moat: RELIANCE','Moat: HDFCBANK','Moat: TITAN'],
    system:`You are a competitive strategy analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Rate moat across 5 dimensions (1-10 each): BRAND STRENGTH → NETWORK EFFECTS → SWITCHING COSTS → COST ADVANTAGES → IP/PATENTS. Compare vs peers. Overall moat score /50. Durability assessment. Under 400 words.`,
    runLabel:'Run Moat Analysis ✦',
    buildQuery:v=>`Moat analysis for ${v.m_ticker} vs peers (${v.m_peers}). Rate 5 dimensions, compare, score /50, assess durability.`},
  {id:'valuation',num:'4',ic:'💰',name:'Valuation',tag:'P/E · DCF · Multiples',
    desc:'Multi-method valuation: P/E vs peers, DCF estimate, EV/EBITDA, and fair value range.',
    fields:[{id:'v_ticker',label:'NSE / BSE Ticker',placeholder:'e.g. INFY',w:'160px'},{id:'v_price',label:'Current Price (₹)',placeholder:'e.g. 1842',w:'140px'}],
    chips:['Valuation: INFY','Valuation: RELIANCE','Valuation: HDFCBANK','Valuation: TCS'],
    system:`You are a valuation specialist at FinSignal Capital. Indian equities. Date: Mar 2026. Multi-method valuation. Bold headers: P/E ANALYSIS (current vs 5yr avg vs sector) → DCF ESTIMATE (WACC, terminal growth, intrinsic value range) → INDUSTRY MULTIPLES (EV/EBITDA, P/B vs peers table) → VALUATION VERDICT (Undervalued/Fair/Overvalued, bull/base/bear targets). Under 400 words.`,
    runLabel:'Run Valuation ✦',
    buildQuery:v=>`Multi-method valuation for ${v.v_ticker} at ₹${v.v_price}. P/E → DCF → Multiples → Verdict with 3 scenarios.`},
  {id:'risk',num:'5',ic:'⚠️',name:'Risk Analysis',tag:'Probability × impact',
    desc:'Map all risk categories, rank by probability × impact, flag permanent impairment risks.',
    fields:[{id:'r_company',label:'Company',placeholder:'e.g. ADANIENT',w:'160px'},{id:'r_thesis',label:'Investment Thesis',placeholder:'e.g. Infra growth play',w:'220px'}],
    chips:['Risk: ADANIENT','Risk: TATAMOTORS','Risk: ZOMATO','Risk: PAYTM'],
    system:`You are a risk analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Comprehensive risk analysis. Bold headers: MACRO RISKS → DISRUPTION RISKS → COMPETITION RISKS → REGULATORY RISKS → RISK RANKING (Probability × Impact matrix) → PERMANENT IMPAIRMENT FLAGS. Under 400 words.`,
    runLabel:'Run Risk Analysis ✦',
    buildQuery:v=>`Risk analysis for ${v.r_company}. Thesis: "${v.r_thesis}". Risk Categories → P×I Ranking → Impairment Flags.`},
  {id:'growth',num:'6',ic:'📈',name:'Growth Potential',tag:'TAM · Pipeline',
    desc:'Size the TAM, evaluate expansion, product pipeline, and build 3 growth scenarios.',
    fields:[{id:'g_company',label:'Company',placeholder:'e.g. BHARTIARTL',w:'160px'},{id:'g_position',label:'Current Position',placeholder:'e.g. #2 telecom',w:'220px'}],
    chips:['Growth: BHARTIARTL','Growth: ZOMATO','Growth: WAAREE','Growth: ANGELONE'],
    system:`You are a growth equity analyst at FinSignal Capital. Indian equities. Date: Mar 2026. Bold headers: TOTAL ADDRESSABLE MARKET → EXPANSION OPPORTUNITIES → PRODUCT PIPELINE & TECH ADVANTAGES → GROWTH SCENARIO TABLE (Low/Mid/High CAGR) → SUMMARY VERDICT. Under 400 words.`,
    runLabel:'Run Growth Analysis ✦',
    buildQuery:v=>`Growth analysis for ${v.g_company} (${v.g_position}). TAM → Expansion → Pipeline → 3 Scenarios → Verdict.`},
  {id:'institutional',num:'7',ic:'🏛️',name:'Institutional Lens',tag:'Hedge fund PM view',
    desc:'Evaluate from a hedge fund PM perspective with catalysts, position sizing, and portfolio fit.',
    fields:[{id:'i_ticker',label:'NSE / BSE Ticker',placeholder:'e.g. TCS',w:'160px'},{id:'i_mc',label:'Market Cap',placeholder:'e.g. ₹15L Cr',w:'160px'}],
    chips:['Institutional: TCS','Institutional: ICICIBANK','Institutional: LT','Institutional: TITAN'],
    system:`You are a hedge fund PM at FinSignal Capital evaluating Indian equities. Date: Mar 2026. NIFTY: 24,835. Bold headers: CORE INVESTMENT THESIS → CATALYSTS WITH TIMELINES (6/12/24 month) → INSTITUTIONAL BUY REASONS (3-4) → INSTITUTIONAL AVOID REASONS (3-4) → PORTFOLIO FIT VERDICT (core/satellite/avoid, position size %). Under 400 words.`,
    runLabel:'Run Institutional Analysis ✦',
    buildQuery:v=>`Institutional analysis for ${v.i_ticker} (MC: ${v.i_mc}). Thesis → Catalysts → Buy/Avoid → Portfolio Fit.`},
  {id:'debate',num:'8',ic:'⚔️',name:'Bull vs Bear',tag:'Structured debate',
    desc:'Two analysts debate with data — one bullish, one bearish. Scorecard and decisive winner.',
    fields:[{id:'d_ticker',label:'NSE / BSE Ticker',placeholder:'e.g. BAJFINANCE',w:'160px'},{id:'d_price',label:'Current Price (₹)',placeholder:'e.g. 7242',w:'140px'}],
    chips:['Debate: BAJFINANCE','Debate: DMART','Debate: ZOMATO','Debate: ADANIENT'],
    system:`You are a debate moderator at FinSignal Capital. Two senior analysts — bull vs bear. Indian equities. Date: Mar 2026. Bold headers: BULL CASE (3 data-backed args) → BEAR CASE (3 counterarguments) → BULL REBUTTAL → BEAR REBUTTAL → SCORECARD (1-5 each) → WINNER DECLARED (one side must win). Under 500 words.`,
    runLabel:'Run Bull vs Bear ✦',
    buildQuery:v=>`Bull vs Bear for ${v.d_ticker} at ₹${v.d_price}. 3 args each → Rebuttals → Scorecard → Winner.`},
  {id:'megastock',num:'9',ic:'🔭',name:'Mega Analysis',tag:'10-dimension deep-dive',
    desc:'Complete 10-point analysis: business model, financials, moat, catalysts, valuation, technicals, insider ownership, bear/bull case, recommendation.',
    fields:[{id:'ms_ticker',label:'Ticker',placeholder:'e.g. RELIANCE',w:'150px'},{id:'ms_sector',label:'Sector',placeholder:'e.g. Energy',w:'140px'},{id:'ms_risk',label:'Risk Tolerance',type:'select',opts:['Conservative','Moderate','Aggressive'],w:'140px'},{id:'ms_timeline',label:'Timeline',type:'select',opts:['Short-term (< 1yr)','Medium-term (1–3 yrs)','Long-term (3+ yrs)'],w:'170px'}],
    chips:['Mega: RELIANCE · Moderate · Long','Mega: TCS · Aggressive · Medium','Mega: ICICIBANK · Moderate · Long'],
    system:`You are a financial analyst at FinSignal Capital. Indian equities. Date: Mar 2026. NIFTY 24,835. RBI Repo 6.5%. 10-point analysis with bold headers: 1. BUSINESS MODEL 2. FINANCIAL HEALTH 3. COMPETITIVE MOAT 4. GROWTH CATALYSTS & HEADWINDS 5. VALUATION VS PEERS 6. TECHNICAL ANALYSIS 7. INSIDER & INSTITUTIONAL OWNERSHIP 8. BEAR CASE 9. BULL CASE 10. RECOMMENDATION (BUY/HOLD/SELL, entry, target, stop-loss, position size). Under 600 words.`,
    runLabel:'Run Mega Analysis ✦',
    buildQuery:v=>`Mega 10-point analysis for ${v.ms_ticker} (${v.ms_sector}). Risk: ${v.ms_risk}. Timeline: ${v.ms_timeline}. All 10 sections.`},
];

const PF_MODES: Mode[] = [
  {id:'budget',num:'10',ic:'💰',name:'Budget Builder',tag:'Zero-based CFP plan',pf:true,
    desc:'Zero-based monthly budget: income breakdown, 50/30/20 analysis, expense cuts, automation plan.',
    fields:[{id:'b_income',label:'Monthly Income',placeholder:'e.g. ₹85,000',w:'180px'},{id:'b_expenses',label:'Major Expenses',placeholder:'e.g. Rent ₹18k, EMIs ₹12k',w:'240px'},{id:'b_debts',label:'Current Debts',placeholder:'e.g. Home loan ₹40L',w:'200px'},{id:'b_goals',label:'Savings Goals',placeholder:'e.g. Emergency fund',w:'200px'}],
    chips:['Budget: ₹80k income · High EMIs','Budget: ₹1.2L income · Lifestyle spend','Budget: ₹50k income · Heavy debt'],
    system:`You are a CFP specialising in Indian personal finance. ₹. Date: Mar 2026. Zero-based budget. Bold headers: INCOME BREAKDOWN → ESSENTIAL EXPENSES (< 50%) → FLEXIBLE SPENDING → FINANCIAL GOALS → 50/30/20 COMPARISON + 5 CUTS → AUTOMATION PLAN → BUDGET TABLE → TOP 3 ACTIONS THIS WEEK. Under 500 words.`,
    runLabel:'Build My Budget ✦',
    buildQuery:v=>`Budget plan. Income: ${v.b_income}. Expenses: ${v.b_expenses}. Debts: ${v.b_debts}. Goals: ${v.b_goals}.`},
  {id:'expensescan',num:'11',ic:'🔍',name:'Expense Analyzer',tag:'Money leak finder',pf:true,
    desc:'Forensic spending audit: 15-category breakdown, subscription audit, money leaks, benchmarks.',
    fields:[{id:'ea_data',label:'Spending Description',placeholder:'e.g. groceries ₹8k, dining ₹5k, Netflix, gym ₹3k',type:'textarea',w:'420px'},{id:'ea_income',label:'Monthly Income',placeholder:'e.g. ₹75,000',w:'130px'}],
    chips:['Scan: ₹70k · High dining + subs','Scan: ₹1L · Lifestyle creep','Scan: ₹50k · Too many EMIs'],
    system:`You are a forensic accountant for Indian personal finance. ₹. Date: Mar 2026. Bold headers: SPENDING BREAKDOWN (15 categories) → TOP 10 LARGEST + FREQUENT → SUBSCRIPTION AUDIT → SPENDING PATTERNS → MONEY LEAKS → BENCHMARK COMPARISON → SAVINGS POTENTIAL → SCORECARD (A-F). Under 500 words.`,
    runLabel:'Scan My Expenses ✦',
    buildQuery:v=>`Expense analysis. Spending: ${v.ea_data}. Income: ${v.ea_income}.`},
  {id:'debt',num:'12',ic:'⛓️',name:'Debt Eliminator',tag:'Snowball vs Avalanche',pf:true,
    desc:'Fastest path to debt-free: snowball vs avalanche, month-by-month plan, extra payment scenarios.',
    fields:[{id:'dt_debts',label:'Your Debts',placeholder:'e.g. Home loan ₹35L @8.5% ₹32k/mo, CC ₹80k @36%',type:'textarea',w:'400px'},{id:'dt_extra',label:'Extra Monthly (₹)',placeholder:'e.g. ₹5,000',w:'160px'}],
    chips:['Debt: CC + personal loan · ₹5k extra','Debt: Home loan · Prepayment','Debt: Multiple EMIs · ₹10k extra'],
    system:`You are a debt elimination strategist for Indian borrowers. ₹. RBI repo 6.5%. Date: Mar 2026. Bold headers: FULL DEBT LIST → INTEREST VS PRINCIPAL → SNOWBALL VS AVALANCHE → BEST METHOD → FASTER SCENARIOS (₹1k/3k/5k extra) → CONSOLIDATION CHECK → MONTH-BY-MONTH PLAN → 5 STRICT RULES. Under 500 words.`,
    runLabel:'Build Debt Roadmap ✦',
    buildQuery:v=>`Debt elimination. Debts: ${v.dt_debts}. Extra: ${v.dt_extra}.`},
  {id:'emergency',num:'13',ic:'🛟',name:'Emergency Fund',tag:'3–12 month target',pf:true,
    desc:'Calculate ideal emergency fund, current gap, risk score, and savings plan.',
    fields:[{id:'ef_expenses',label:'Monthly Expenses (₹)',placeholder:'e.g. ₹35,000',w:'200px'},{id:'ef_savings',label:'Current Savings (₹)',placeholder:'e.g. ₹20,000',w:'160px'},{id:'ef_job',label:'Job Stability',type:'select',opts:['Very stable (Govt)','Stable (MNC)','Moderate (Private)','Variable (Freelance)','High risk (Business)'],w:'200px'},{id:'ef_deps',label:'Dependents',type:'select',opts:['None','1','2–3','4+'],w:'130px'}],
    chips:['Emergency: ₹40k · ₹0 saved · Stable','Emergency: ₹60k · Freelancer · 2 kids'],
    system:`You are a financial planner for Indian households. ₹. Date: Mar 2026. Bold headers: EXPENSES TOTAL → FUND TARGETS (3/6/12 months) → RECOMMENDED SIZE (risk score 1-10) → CURRENT GAP → MONTHLY SAVINGS PLAN → FASTER OPTIONS → ACCOUNT COMPARISON (FD, liquid MF, HYSA) → EMERGENCY RULES → REPLENISHMENT PLAN. Under 400 words.`,
    runLabel:'Calculate Emergency Fund ✦',
    buildQuery:v=>`Emergency fund. Expenses: ${v.ef_expenses}. Savings: ${v.ef_savings}. Job: ${v.ef_job}. Dependents: ${v.ef_deps}.`},
  {id:'savingsgoal',num:'14',ic:'🎯',name:'Savings Goal',tag:'Reverse-engineer any goal',pf:true,
    desc:'Reverse-engineer any savings goal: required amounts, best accounts, funding plan, milestones.',
    fields:[{id:'sg_goal',label:'What For?',placeholder:'e.g. House, wedding, MBA',w:'220px'},{id:'sg_target',label:'Target (₹)',placeholder:'e.g. ₹10,00,000',w:'150px'},{id:'sg_date',label:'Target Date',placeholder:'e.g. Dec 2027',w:'150px'},{id:'sg_budget',label:'Monthly Budget (₹)',placeholder:'e.g. ₹15,000',w:'180px'}],
    chips:['Goal: House ₹25L · 3 years','Goal: Emergency ₹5L · 18 months'],
    system:`You are a goal-based financial coach for Indian investors. ₹. Date: Mar 2026. Bold headers: GOAL ANALYSIS → REQUIRED SAVINGS (monthly/weekly/daily) → FASTER SCENARIOS → BEST ACCOUNT/INVESTMENT → FUNDING PLAN → QUARTERLY MILESTONES → MOTIVATION SYSTEM. Under 400 words.`,
    runLabel:'Build Savings Blueprint ✦',
    buildQuery:v=>`Savings goal. Goal: ${v.sg_goal}. Target: ${v.sg_target}. Deadline: ${v.sg_date}. Budget: ${v.sg_budget}.`},
  {id:'networth',num:'15',ic:'📊',name:'Net Worth Tracker',tag:'Assets vs liabilities',pf:true,
    desc:'Calculate net worth, liquid net worth, peer comparison, health ratios, milestone timeline.',
    fields:[{id:'nw_assets',label:'Assets',placeholder:'e.g. Flat ₹60L, PF ₹8L, Stocks ₹3L',type:'textarea',w:'340px'},{id:'nw_debts',label:'Liabilities',placeholder:'e.g. Home loan ₹40L',w:'240px'},{id:'nw_age',label:'Age',placeholder:'e.g. 32',w:'80px'},{id:'nw_income',label:'Annual Income',placeholder:'e.g. ₹12L',w:'160px'}],
    chips:['Net worth: 28yo · ₹5L assets','Net worth: 35yo · Flat + PF','Net worth: 45yo · Plan to 1Cr'],
    system:`You are a private wealth advisor for Indian clients. ₹. Date: Mar 2026. Bold headers: ASSET TABLE → LIABILITY TABLE → NET WORTH STATEMENT → PEER COMPARISON → HEALTH RATIOS → GROWTH TARGETS → MILESTONE TIMELINE (₹25L → ₹50L → ₹1Cr) → QUARTERLY REVIEW. Under 400 words.`,
    runLabel:'Calculate Net Worth ✦',
    buildQuery:v=>`Net worth. Assets: ${v.nw_assets}. Liabilities: ${v.nw_debts}. Age: ${v.nw_age}. Income: ${v.nw_income}.`},
  {id:'retirement',num:'16',ic:'🏖️',name:'Retirement Readiness',tag:'Gap analysis',pf:true,
    desc:'Assess retirement readiness: nest egg calculation, gap analysis, catch-up options, confidence score.',
    fields:[{id:'rt_age',label:'Current Age',placeholder:'e.g. 34',w:'90px'},{id:'rt_retireage',label:'Retire At',placeholder:'e.g. 60',w:'120px'},{id:'rt_corpus',label:'Current Savings (₹)',placeholder:'e.g. PF ₹6L, NPS ₹2L',w:'220px'},{id:'rt_contrib',label:'Annual Contributions',placeholder:'e.g. ₹1,80,000',w:'170px'},{id:'rt_income_req',label:'Retirement Income (₹/mo)',placeholder:'e.g. ₹75,000',w:'200px'}],
    chips:['Retirement: 30yo · ₹60k saved','Retirement: 45yo · ₹25L · Behind'],
    system:`You are a retirement planning specialist for Indian investors. ₹. EPF/NPS/PPF context. Date: Mar 2026. Inflation 6%. Equity return 12%. Bold headers: INCOME TARGET → CURRENT ASSETS PROJECTED → SAVINGS RATE VS 15% → GAP ANALYSIS → CATCH-UP OPTIONS → TAX DIVERSIFICATION → WITHDRAWAL STRATEGY → ALLOCATION CHECK → CONFIDENCE SCORE (1-10). Under 500 words.`,
    runLabel:'Analyse Retirement ✦',
    buildQuery:v=>`Retirement readiness. Age: ${v.rt_age}. Retire at: ${v.rt_retireage}. Savings: ${v.rt_corpus}. Contributions: ${v.rt_contrib}. Monthly need: ${v.rt_income_req}.`},
  {id:'insurance',num:'17',ic:'🛡️',name:'Insurance Audit',tag:'Coverage gaps & waste',pf:true,
    desc:'Independent insurance review: life cover gap, health gaps, disability, premium reduction.',
    fields:[{id:'ins_coverage',label:'Current Coverage',placeholder:'e.g. Term ₹50L @₹12k/yr, Health ₹5L @₹18k/yr',type:'textarea',w:'380px'},{id:'ins_age',label:'Age',placeholder:'e.g. 35',w:'80px'},{id:'ins_deps',label:'Dependents',placeholder:'e.g. Spouse + 1 child',w:'160px'},{id:'ins_income',label:'Annual Income',placeholder:'e.g. ₹12L',w:'140px'}],
    chips:['Insurance: 32yo · Term + health','Insurance: 40yo · Family · Check gaps'],
    system:`You are an independent insurance advisor for Indian clients. ₹. IRDAI context. Date: Mar 2026. Bold headers: LIFE INSURANCE NEED (HLV method) → HEALTH REVIEW → DISABILITY COVERAGE → HOME/AUTO → UMBRELLA LIABILITY → UNDERINSURED/OVERINSURED TABLE → PREMIUM REDUCTION ACTIONS. No product names. Under 400 words.`,
    runLabel:'Audit My Insurance ✦',
    buildQuery:v=>`Insurance audit. Coverage: ${v.ins_coverage}. Age: ${v.ins_age}. Dependents: ${v.ins_deps}. Income: ${v.ins_income}.`},
  {id:'healthcheck',num:'18',ic:'🏥',name:'Financial Health Check',tag:'Master CFP assessment',pf:true,
    desc:'Complete financial health checkup: 7-dimension scorecard, cash flow, debt strategy, 90-day action plan.',
    fields:[{id:'hc_income',label:'Monthly Income',placeholder:'e.g. ₹90,000',w:'160px'},{id:'hc_expenses',label:'Expenses',placeholder:'e.g. Rent ₹18k, EMIs ₹15k',w:'240px'},{id:'hc_debts',label:'Debts',placeholder:'e.g. Home loan ₹45L',w:'200px'},{id:'hc_assets',label:'Assets',placeholder:'e.g. PF ₹10L, FD ₹2L',w:'200px'},{id:'hc_age',label:'Age',placeholder:'e.g. 34',w:'80px'},{id:'hc_goals',label:'Goals',placeholder:'e.g. Buy flat, retire at 55',w:'220px'}],
    chips:['Checkup: 30yo · ₹80k · High EMIs','Checkup: 40yo · ₹1.5L · Mid-life'],
    system:`You are a CFP delivering a complete financial health assessment. Indian context. ₹. Date: Mar 2026. Bold headers: EXECUTIVE SUMMARY → FINANCIAL SCORECARD (7 areas 1-10) → CASH FLOW REVIEW → DEBT STRATEGY → INVESTMENT GAPS → INSURANCE GAPS → GOAL ALIGNMENT → 90-DAY ACTION PLAN → THE SINGLE MOST IMPORTANT FIX. Under 600 words.`,
    runLabel:'Run Full Health Check ✦',
    buildQuery:v=>`Health check. Income: ${v.hc_income}. Expenses: ${v.hc_expenses}. Debts: ${v.hc_debts}. Assets: ${v.hc_assets}. Age: ${v.hc_age}. Goals: ${v.hc_goals}.`},
];

const ALL_MODES = [...MODES, ...PF_MODES];

export const ResearchDeskPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState('full');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
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

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            { role: 'system', content: currentMode.system },
            ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: text }
          ]
        }
      });
      if (error) throw error;
      const aiContent = typeof data === 'string' ? data : (data?.content || data?.choices?.[0]?.message?.content || 'Analysis complete.');
      setMessages(prev => [...prev, { role: 'ai', content: aiContent }]);
    } catch (e: any) {
      console.error('Chat error:', e);
      const demoResponse = `**${currentMode.name} — Analysis**\n\nProcessing your query: "${text}"\n\n**Market Context (Mar 2026):**\n• NIFTY 50 at 24,835 (+0.74%)\n• IT sector outperforming +1.24%\n• RBI repo rate steady at 6.5%\n• FII inflows +₹2,340 Cr\n\nThe AI research engine is processing your request. For live analysis, ensure the backend function is deployed and active.\n\n*FinSignal Capital — Institutional Research Platform*`;
      setMessages(prev => [...prev, { role: 'ai', content: demoResponse }]);
    } finally {
      setLoading(false);
    }
  };

  const runMode = () => {
    const hasEmpty = currentMode.fields.some(f => !fieldValues[f.id]?.trim());
    if (hasEmpty) { alert('Please fill in all fields.'); return; }
    const query = currentMode.buildQuery(fieldValues);
    sendMessage(query);
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
        {/* Mode Header + Fields */}
        <div className="px-5 py-3.5 border-b border-b1 surface-0 flex-shrink-0">
          <div className="flex items-start gap-2.5 mb-3">
            <span className="text-xl mt-0.5">{currentMode.ic}</span>
            <div>
              <div className="font-serif text-[15px] text-t0">{currentMode.name}</div>
              <div className="text-[11px] text-t2 mt-0.5 leading-relaxed max-w-[600px]">{currentMode.desc}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            {currentMode.fields.map(f => (
              <div key={f.id} className="flex flex-col">
                <label className="text-[10px] font-semibold text-t2 tracking-wide mb-1">{f.label}</label>
                {f.type === 'select' ? (
                  <select value={fieldValues[f.id] || ''} onChange={e => setField(f.id, e.target.value)}
                    className="surface-3 border border-b1 rounded-lg px-3 py-2 text-t0 text-[12px] outline-none transition-colors focus:border-brand appearance-none cursor-pointer"
                    style={{ width: f.w || '160px' }}>
                    <option value="">Select...</option>
                    {f.opts?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea value={fieldValues[f.id] || ''} onChange={e => setField(f.id, e.target.value)}
                    placeholder={f.placeholder}
                    className="surface-3 border border-b1 rounded-lg px-3 py-2 text-t0 text-[12px] outline-none transition-colors focus:border-brand resize-vertical"
                    style={{ width: f.w || '240px', minHeight: '52px', maxHeight: '110px', lineHeight: '1.5' }} />
                ) : (
                  <input value={fieldValues[f.id] || ''} onChange={e => setField(f.id, e.target.value)}
                    placeholder={f.placeholder}
                    className="surface-3 border border-b1 rounded-lg px-3 py-2 text-t0 text-[12px] outline-none transition-colors focus:border-brand"
                    style={{ width: f.w || '160px' }} />
                )}
              </div>
            ))}
            <button onClick={runMode} disabled={loading}
              className={`px-4 py-2 rounded-lg font-bold text-[12px] border-none transition-all hover:opacity-90 hover:-translate-y-px active:translate-y-0 disabled:opacity-35 self-end mb-px
                ${isPF ? 'bg-fs-green text-[#071A0E] shadow-[0_0_20px_rgba(16,217,138,0.2)]' : 'bg-brand text-primary-foreground shadow-[0_0_20px_hsl(var(--brand-glow))]'}`}>
              {currentMode.runLabel}
            </button>
          </div>
        </div>

        {/* Chat */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-t3">
              <div className="text-5xl opacity-30">{currentMode.ic}</div>
              <div className="text-sm font-bold text-t2">Ask anything about {currentMode.name}</div>
              <div className="text-xs text-t3 text-center max-w-sm leading-relaxed">
                Fill in the fields above and click the run button, or type a query below.
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
          {currentMode.chips.map(chip => (
            <button key={chip} onClick={() => chipRun(chip)}
              className={`px-3 py-1.5 rounded-full border text-[10.5px] font-semibold transition-all whitespace-nowrap
                ${isPF ? 'border-b1 text-t2 hover:border-fs-green hover:text-fs-green hover:bg-fs-green-dim' : 'border-b1 text-t2 hover:border-brand hover:text-brand hover:bg-brand-dim'}`}>
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="px-5 py-3 border-t border-b1 flex-shrink-0">
          <div className="flex gap-2.5 surface-2 border border-b2 rounded-xl px-3 py-2.5 transition-all focus-within:border-brand focus-within:shadow-[0_0_0_3px_hsl(var(--brand-dim))] items-end">
            <textarea ref={textareaRef} value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput); } }}
              className="flex-1 bg-transparent border-none outline-none text-t0 text-[13px] resize-none leading-relaxed max-h-[90px] placeholder:text-t3"
              placeholder={`Ask about ${currentMode.name.toLowerCase()}...`} rows={1} />
            <button onClick={() => sendMessage(chatInput)} disabled={!chatInput.trim() || loading}
              className="w-[34px] h-[34px] bg-brand rounded-lg text-primary-foreground text-[15px] flex items-center justify-center flex-shrink-0 transition-all hover:opacity-85 hover:scale-105 disabled:opacity-30">↑</button>
          </div>
        </div>
      </div>
    </div>
  );
};
