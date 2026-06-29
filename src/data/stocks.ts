// Stock market data for the dashboard
export const INDICES = [
  { n: 'NIFTY 50', v: '23,456.20', c: '+2.34%', u: true },
  { n: 'SENSEX', v: '77,890.45', c: '+2.15%', u: true },
  { n: 'NIFTY IT', v: '42,123.10', c: '+3.45%', u: true },
  { n: 'BANK NIFTY', v: '48,234.75', c: '+1.89%', u: true },
];

export const TOP_GAINERS = [
  { s: 'RELIANCE', n: 'Reliance Industries', p: '₹2,845.50', c: '+4.32%' },
  { s: 'INFY', n: 'Infosys Limited', p: '₹1,834.20', c: '+3.89%' },
  { s: 'TCS', n: 'Tata Consultancy', p: '₹3,456.75', c: '+2.56%' },
  { s: 'WIPRO', n: 'Wipro Limited', p: '₹832.40', c: '+2.34%' },
  { s: 'HCL-TECH', n: 'HCL Technologies', p: '₹1,545.80', c: '+1.92%' },
];

export const TOP_LOSERS = [
  { s: 'HDBANK', n: 'HDFC Bank Limited', p: '₹1,234.50', c: '-2.15%' },
  { s: 'ICICIBANK', n: 'ICICI Bank Limited', p: '₹978.30', c: '-1.87%' },
  { s: 'AXISBANK', n: 'Axis Bank Limited', p: '₹1,089.75', c: '-1.45%' },
  { s: 'KOTAKBANK', n: 'Kotak Mahindra Bank', p: '₹1,892.40', c: '-1.23%' },
  { s: 'MARUTI', n: 'Maruti Suzuki India', p: '₹9,234.25', c: '-0.98%' },
];

export const HEATMAP_DATA = [
  { n: 'IT', c: '+3.45%', pct: 3.45 },
  { n: 'Finance', c: '+2.12%', pct: 2.12 },
  { n: 'Energy', c: '+1.89%', pct: 1.89 },
  { n: 'Consumer', c: '+0.67%', pct: 0.67 },
  { n: 'Pharma', c: '-0.45%', pct: -0.45 },
  { n: 'Utilities', c: '-1.23%', pct: -1.23 },
  { n: 'Metal', c: '-2.34%', pct: -2.34 },
  { n: 'Auto', c: '-1.56%', pct: -1.56 },
];

export const formatINR = (num: number) => num.toLocaleString('en-IN');

export type Stock = {
  s: string;
  sc: 'buy' | 'sell' | 'hold';
  sig: string;
  p: number;
  ch: number;
  cp: number;
  u: boolean;
  cf: number;
  sec: string;
  mc: string;
  n: string;
  pe: number;
  pb: number;
  roe: number;
  de: number;
  beta: number;
  w52h: number;
  w52l: number;
  promo: number;
  pledge: number;
  dy: number;
  lo: number;
  hi: number;
  sig2?: string;
};

// AI Signal Database
export const DB: Stock[] = [
  { s: 'RELIANCE', sc: 'buy', sig: 'BUY', p: 2845, ch: 120, cp: 4.3, u: true, cf: 87, sec: 'Energy', mc: 'Large Cap', n: 'Reliance Industries', pe: 24, pb: 2.8, roe: 18, de: 0.6, beta: 0.9, w52h: 3100, w52l: 2200, promo: 50, pledge: 0, dy: 2.1, lo: 2780, hi: 2920 },
  { s: 'INFY', sc: 'buy', sig: 'BUY', p: 1834, ch: 65, cp: 3.9, u: true, cf: 82, sec: 'IT', mc: 'Large Cap', n: 'Infosys Limited', pe: 22, pb: 4.2, roe: 21, de: 0.2, beta: 1.1, w52h: 1950, w52l: 1400, promo: 12, pledge: 0, dy: 2.3, lo: 1790, hi: 1880 },
  { s: 'TCS', sc: 'buy', sig: 'BUY', p: 3457, ch: 85, cp: 2.6, u: true, cf: 79, sec: 'IT', mc: 'Large Cap', n: 'Tata Consultancy', pe: 26, pb: 5.1, roe: 23, de: 0.0, beta: 1.0, w52h: 3800, w52l: 2900, promo: 72, pledge: 0, dy: 1.8, lo: 3350, hi: 3600 },
  { s: 'WIPRO', sc: 'hold', sig: 'HOLD', p: 832, ch: 18, cp: 2.3, u: true, cf: 68, sec: 'IT', mc: 'Large Cap', n: 'Wipro Limited', pe: 20, pb: 3.5, roe: 19, de: 0.3, beta: 1.2, w52h: 920, w52l: 650, promo: 73, pledge: 0, dy: 3.4, lo: 810, hi: 880 },
  { s: 'HDBANK', sc: 'sell', sig: 'SELL', p: 1235, ch: -27, cp: -2.2, u: false, cf: 75, sec: 'Finance', mc: 'Large Cap', n: 'HDFC Bank Limited', pe: 18, pb: 1.8, roe: 15, de: 0.1, beta: 1.3, w52h: 1450, w52l: 950, promo: 0, pledge: 0, dy: 2.8, lo: 1200, hi: 1350 },
  { s: 'ICICIBANK', sc: 'hold', sig: 'HOLD', p: 978, ch: -18, cp: -1.9, u: false, cf: 65, sec: 'Finance', mc: 'Large Cap', n: 'ICICI Bank Limited', pe: 17, pb: 1.6, roe: 14, de: 0.2, beta: 1.4, w52h: 1100, w52l: 850, promo: 0, pledge: 0, dy: 3.1, lo: 950, hi: 1050 },
  { s: 'AXISBANK', sc: 'buy', sig: 'BUY', p: 1090, ch: -16, cp: -1.5, u: false, cf: 72, sec: 'Finance', mc: 'Large Cap', n: 'Axis Bank Limited', pe: 19, pb: 1.9, roe: 16, de: 0.15, beta: 1.3, w52h: 1250, w52l: 900, promo: 0, pledge: 0, dy: 2.5, lo: 1050, hi: 1150 },
  { s: 'KOTAKBANK', sc: 'buy', sig: 'BUY', p: 1892, ch: -23, cp: -1.2, u: false, cf: 78, sec: 'Finance', mc: 'Large Cap', n: 'Kotak Mahindra Bank', pe: 21, pb: 2.1, roe: 17, de: 0.05, beta: 1.2, w52h: 2100, w52l: 1650, promo: 27, pledge: 0, dy: 2.0, lo: 1850, hi: 1950 },
];

export const SECTORS = ['IT', 'Finance', 'Energy', 'Consumer', 'Pharma', 'Utilities', 'Metal', 'Auto', 'Others'];

export const PRICES: Record<string, number> = {
  RELIANCE: 2845,
  INFY: 1834,
  TCS: 3457,
  WIPRO: 832,
  HDBANK: 1235,
  ICICIBANK: 978,
  AXISBANK: 1090,
  KOTAKBANK: 1892,
};