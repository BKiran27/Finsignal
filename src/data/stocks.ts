export interface Stock {
  s: string; n: string; sec: string; p: number; ch: number; cp: number; u: number;
  lo: number; hi: number; w52l: number; w52h: number; mc: string;
  pe: number; pb: number; dy: number; beta: number; roe: number; de: number;
  promo: number; pledge: number; sig: string; sc: string; cf: number;
}

export const DB: Stock[] = [
  {s:'RELIANCE',n:'Reliance Industries Ltd',sec:'Energy',p:2948.70,ch:34.50,cp:1.18,u:1,lo:2886.2,hi:2961.4,w52l:2220.3,w52h:3217.9,mc:'₹19.96L Cr',pe:24.6,pb:2.1,dy:0.4,beta:0.82,roe:17.2,de:0.8,promo:50.3,pledge:0,sig:'BUY',sc:'buy',cf:74},
  {s:'TCS',n:'Tata Consultancy Services',sec:'IT',p:4218.60,ch:37.10,cp:0.89,u:1,lo:4172,hi:4231.45,w52l:3311.2,w52h:4592.25,mc:'₹15.32L Cr',pe:29.1,pb:13.2,dy:1.8,beta:0.78,roe:46.8,de:0,promo:72.3,pledge:0,sig:'BUY',sc:'buy',cf:76},
  {s:'HDFCBANK',n:'HDFC Bank Ltd',sec:'Banking',p:1724.90,ch:5.40,cp:0.31,u:1,lo:1706.15,hi:1739.8,w52l:1363.55,w52h:1880,mc:'₹13.14L Cr',pe:19.8,pb:2.8,dy:1.1,beta:0.82,roe:17.4,de:6.2,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:68},
  {s:'ICICIBANK',n:'ICICI Bank Ltd',sec:'Banking',p:1248.90,ch:11.40,cp:0.92,u:1,lo:1232.6,hi:1256.45,w52l:967.4,w52h:1384.85,mc:'₹8.80L Cr',pe:17.2,pb:3.1,dy:0.8,beta:0.94,roe:18.4,de:5.8,promo:0,pledge:0,sig:'BUY',sc:'buy',cf:77},
  {s:'INFY',n:'Infosys Ltd',sec:'IT',p:1842.35,ch:43.20,cp:2.40,u:1,lo:1791,hi:1854.8,w52l:1358.35,w52h:1963.25,mc:'₹7.67L Cr',pe:28.4,pb:7.8,dy:2.8,beta:0.91,roe:29.4,de:0.1,promo:14.9,pledge:0,sig:'BUY',sc:'buy',cf:81},
  {s:'HINDUNILVR',n:'Hindustan Unilever Ltd',sec:'FMCG',p:2312.45,ch:-12.30,cp:-0.53,u:0,lo:2288.1,hi:2338.6,w52l:2120.5,w52h:2900.4,mc:'₹5.43L Cr',pe:54.2,pb:11.8,dy:1.4,beta:0.64,roe:21.4,de:0,promo:61.9,pledge:0,sig:'HOLD',sc:'hold',cf:60},
  {s:'BHARTIARTL',n:'Bharti Airtel Ltd',sec:'Telecom',p:1682.40,ch:18.70,cp:1.12,u:1,lo:1658.2,hi:1694.8,w52l:960.2,w52h:1779.5,mc:'₹9.89L Cr',pe:72.8,pb:8.4,dy:0.4,beta:0.92,roe:18.6,de:2.2,promo:55.8,pledge:0,sig:'BUY',sc:'buy',cf:78},
  {s:'ITC',n:'ITC Ltd',sec:'FMCG',p:448.20,ch:-3.40,cp:-0.75,u:0,lo:440.8,hi:453.6,w52l:399.35,w52h:528.5,mc:'₹5.61L Cr',pe:26.4,pb:6.8,dy:3.2,beta:0.72,roe:26.8,de:0,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:64},
  {s:'KOTAKBANK',n:'Kotak Mahindra Bank Ltd',sec:'Banking',p:1842.60,ch:14.80,cp:0.81,u:1,lo:1826.3,hi:1856.4,w52l:1544.15,w52h:2062.25,mc:'₹3.67L Cr',pe:21.4,pb:3.2,dy:0.1,beta:0.86,roe:14.8,de:5.4,promo:25.9,pledge:0,sig:'BUY',sc:'buy',cf:70},
  {s:'LT',n:'Larsen & Toubro Ltd',sec:'Infra',p:3648.90,ch:28.40,cp:0.78,u:1,lo:3612.5,hi:3668.2,w52l:2727.3,w52h:3963.5,mc:'₹5.02L Cr',pe:32.6,pb:5.8,dy:0.8,beta:1.12,roe:16.4,de:1.4,promo:0,pledge:0,sig:'BUY',sc:'buy',cf:74},
  {s:'SBIN',n:'State Bank of India',sec:'Banking',p:772.45,ch:-2.10,cp:-0.27,u:0,lo:765.8,hi:781.3,w52l:543.25,w52h:912.1,mc:'₹6.89L Cr',pe:10.2,pb:1.3,dy:2.8,beta:1.24,roe:14.8,de:11.4,promo:57.5,pledge:0,sig:'HOLD',sc:'hold',cf:65},
  {s:'BAJFINANCE',n:'Bajaj Finance Ltd',sec:'NBFC',p:7241.80,ch:-43.20,cp:-0.59,u:0,lo:7189.45,hi:7318.6,w52l:6187.8,w52h:8192.4,mc:'₹4.37L Cr',pe:32.6,pb:6.2,dy:0.4,beta:1.12,roe:19.8,de:3.6,promo:56.1,pledge:0,sig:'HOLD',sc:'hold',cf:62},
  {s:'MARUTI',n:'Maruti Suzuki India Ltd',sec:'Auto',p:12841.30,ch:78.60,cp:0.62,u:1,lo:12742,hi:12904.55,w52l:9833.05,w52h:13680,mc:'₹4.04L Cr',pe:26.4,pb:4.9,dy:0.8,beta:0.87,roe:18.4,de:0,promo:56.2,pledge:0,sig:'BUY',sc:'buy',cf:69},
  {s:'TATAMOTORS',n:'Tata Motors Ltd',sec:'Auto',p:987.60,ch:-8.15,cp:-0.82,u:0,lo:978.4,hi:1001.25,w52l:643.05,w52h:1179.05,mc:'₹3.62L Cr',pe:8.2,pb:2.6,dy:0.3,beta:1.31,roe:30.2,de:2.1,promo:46.4,pledge:0,sig:'BUY',sc:'buy',cf:81},
  {s:'ADANIENT',n:'Adani Enterprises Ltd',sec:'Infra',p:2540.15,ch:-36.25,cp:-1.41,u:0,lo:2498.3,hi:2591.7,w52l:2025.9,w52h:3743.9,mc:'₹2.89L Cr',pe:74.8,pb:8.4,dy:0.1,beta:1.58,roe:8.4,de:3.8,promo:72.6,pledge:17.8,sig:'SELL',sc:'sell',cf:76},
  {s:'WIPRO',n:'Wipro Ltd',sec:'IT',p:572.40,ch:10.25,cp:1.82,u:1,lo:558.7,hi:576.9,w52l:396.25,w52h:609.95,mc:'₹3.00L Cr',pe:22.1,pb:3.8,dy:0.7,beta:0.88,roe:15.6,de:0.2,promo:72.9,pledge:0,sig:'BUY',sc:'buy',cf:71},
  {s:'SUNPHARMA',n:'Sun Pharmaceutical Ind.',sec:'Pharma',p:1712.45,ch:9.35,cp:0.55,u:1,lo:1698.1,hi:1722.8,w52l:1161,w52h:1960.95,mc:'₹4.11L Cr',pe:38.4,pb:7.2,dy:0.6,beta:0.68,roe:14.6,de:0.2,promo:54.5,pledge:0,sig:'HOLD',sc:'hold',cf:64},
  {s:'TITAN',n:'Titan Company Ltd',sec:'Consumer',p:3312.40,ch:24.60,cp:0.75,u:1,lo:3282.1,hi:3328.9,w52l:2780.25,w52h:3886,mc:'₹2.94L Cr',pe:86.4,pb:18.4,dy:0.3,beta:0.96,roe:24.6,de:0.4,promo:52.9,pledge:0,sig:'HOLD',sc:'hold',cf:62},
  {s:'AXISBANK',n:'Axis Bank Ltd',sec:'Banking',p:1142.70,ch:8.90,cp:0.78,u:1,lo:1128.35,hi:1153.2,w52l:977.4,w52h:1339.65,mc:'₹3.52L Cr',pe:14.8,pb:2.1,dy:0.2,beta:1.16,roe:16.4,de:8.4,promo:8.2,pledge:0,sig:'BUY',sc:'buy',cf:70},
  {s:'HCLTECH',n:'HCL Technologies Ltd',sec:'IT',p:1748.55,ch:19.85,cp:1.15,u:1,lo:1722.1,hi:1756.4,w52l:1235.65,w52h:1929,mc:'₹4.74L Cr',pe:27.2,pb:7.1,dy:3.4,beta:0.86,roe:22.8,de:0,promo:60.8,pledge:0,sig:'BUY',sc:'buy',cf:69},
  {s:'ZOMATO',n:'Zomato Ltd',sec:'Consumer Tech',p:248.40,ch:4.80,cp:1.97,u:1,lo:243.2,hi:252.8,w52l:127.9,w52h:299.7,mc:'₹2.19L Cr',pe:484.2,pb:10.8,dy:0,beta:1.48,roe:2.2,de:0,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:56},
  {s:'HAL',n:'Hindustan Aeronautics Ltd',sec:'Defence',p:4212.60,ch:38.40,cp:0.92,u:1,lo:4168.4,hi:4248.8,w52l:2748.5,w52h:5675.6,mc:'₹2.82L Cr',pe:38.4,pb:11.8,dy:0.8,beta:1.12,roe:30.8,de:0,promo:71.6,pledge:0,sig:'BUY',sc:'buy',cf:74},
  {s:'CIPLA',n:'Cipla Ltd',sec:'Pharma',p:1484.20,ch:12.80,cp:0.87,u:1,lo:1468.4,hi:1492.6,w52l:1046.1,w52h:1702.05,mc:'₹1.20L Cr',pe:28.6,pb:4.8,dy:0.5,beta:0.74,roe:16.2,de:0.2,promo:33.5,pledge:0,sig:'BUY',sc:'buy',cf:68},
  {s:'DRREDDY',n:"Dr. Reddy's Laboratories",sec:'Pharma',p:1282.40,ch:8.60,cp:0.67,u:1,lo:1268.2,hi:1296.8,w52l:1103.4,w52h:1420.5,mc:'₹2.14L Cr',pe:18.4,pb:3.4,dy:0.6,beta:0.72,roe:20.4,de:0.1,promo:26.7,pledge:0,sig:'BUY',sc:'buy',cf:70},
  {s:'INDIGO',n:'InterGlobe Aviation Ltd',sec:'Aviation',p:4248.60,ch:38.40,cp:0.91,u:1,lo:4202.4,hi:4278.8,w52l:2771.3,w52h:5280.65,mc:'₹1.64L Cr',pe:22.4,pb:18.4,dy:0,beta:1.28,roe:82.4,de:1.8,promo:37.8,pledge:0,sig:'BUY',sc:'buy',cf:69},
  {s:'DIXON',n:'Dixon Technologies Ltd',sec:'Electronics',p:15240.80,ch:312.40,cp:2.09,u:1,lo:14892.4,hi:15348.6,w52l:6427.15,w52h:18918.9,mc:'₹91,442Cr',pe:108.4,pb:24.8,dy:0.1,beta:1.42,roe:24.8,de:0.4,promo:34.7,pledge:0,sig:'BUY',sc:'buy',cf:72},
  {s:'PERSISTENT',n:'Persistent Systems Ltd',sec:'IT',p:5412.40,ch:76.20,cp:1.43,u:1,lo:5328.4,hi:5448.6,w52l:3232.95,w52h:6788.5,mc:'₹83,642Cr',pe:62.4,pb:14.8,dy:0.4,beta:1.04,roe:24.4,de:0,promo:31.5,pledge:0,sig:'BUY',sc:'buy',cf:68},
];

export const PRICES: Record<string, number> = {};
DB.forEach(s => PRICES[s.s] = s.p);

export const TICKS = [
  {n:'NIFTY 50',p:'24,835',c:'+0.74%',u:1},
  {n:'SENSEX',p:'81,742',c:'+0.68%',u:1},
  {n:'BANKNIFTY',p:'53,204',c:'−0.31%',u:0},
  {n:'NIFTY IT',p:'38,920',c:'+1.24%',u:1},
  {n:'NIFTY AUTO',p:'22,108',c:'−0.43%',u:0},
  {n:'NIFTY PHARMA',p:'19,341',c:'+0.45%',u:1},
  {n:'MIDCAP 50',p:'52,619',c:'+0.55%',u:1},
  {n:'NIFTY FMCG',p:'54,210',c:'+0.18%',u:1},
];

export const INDICES = [
  {n:'NIFTY 50',v:'24,835',c:'+183',u:1},
  {n:'SENSEX',v:'81,742',c:'+556',u:1},
  {n:'BANKNIFTY',v:'53,204',c:'−167',u:0},
  {n:'NIFTY IT',v:'38,920',c:'+476',u:1},
  {n:'MIDCAP 50',v:'52,619',c:'+288',u:1},
  {n:'NIFTY AUTO',v:'22,108',c:'−96',u:0},
];

export const TOP_GAINERS = [
  {s:'DIXON',c:'+2.09%',p:'₹15,240',n:'Electronics'},
  {s:'INFY',c:'+2.40%',p:'₹1,842',n:'IT'},
  {s:'PERSISTENT',c:'+1.43%',p:'₹5,412',n:'IT'},
  {s:'WIPRO',c:'+1.82%',p:'₹572',n:'IT'},
];

export const TOP_LOSERS = [
  {s:'ADANIENT',c:'−1.41%',p:'₹2,540',n:'Infra'},
  {s:'TATAMOTORS',c:'−0.82%',p:'₹987',n:'Auto'},
  {s:'BAJFINANCE',c:'−0.59%',p:'₹7,241',n:'NBFC'},
  {s:'SBIN',c:'−0.27%',p:'₹772',n:'Banking'},
];

export const HEATMAP_DATA = [
  {n:'IT',c:'+1.24%',pct:1.24},
  {n:'Pharma',c:'+0.55%',pct:0.55},
  {n:'Energy',c:'+0.44%',pct:0.44},
  {n:'FMCG',c:'+0.18%',pct:0.18},
  {n:'Auto',c:'−0.43%',pct:-0.43},
  {n:'Banking',c:'−0.12%',pct:-0.12},
  {n:'Infra',c:'−1.41%',pct:-1.41},
  {n:'NBFC',c:'−0.47%',pct:-0.47},
];

export const SECTORS = ['IT','Banking','Auto','Pharma','Energy','FMCG','Chemicals','Infra','Power','NBFC','Consumer','Others'];

export function formatINR(v: number): string {
  return v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatINRShort(v: number): string {
  return v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
