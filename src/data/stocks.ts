export interface Stock {
  s: string; n: string; sec: string; p: number; ch: number; cp: number; u: number;
  lo: number; hi: number; w52l: number; w52h: number; mc: string;
  pe: number; pb: number; dy: number; beta: number; roe: number; de: number;
  promo: number; pledge: number; sig: string; sc: string; cf: number;
}

export const DB: Stock[] = [
/* ── NIFTY 50 ── */
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
{s:'HCLTECH',n:'HCL Technologies Ltd',sec:'IT',p:1748.55,ch:19.85,cp:1.15,u:1,lo:1722.1,hi:1756.4,w52l:1235.65,w52h:1929,mc:'₹4.74L Cr',pe:27.2,pb:7.1,dy:3.4,beta:0.86,roe:22.8,de:0,promo:60.8,pledge:0,sig:'BUY',sc:'buy',cf:69},
{s:'WIPRO',n:'Wipro Ltd',sec:'IT',p:572.40,ch:10.25,cp:1.82,u:1,lo:558.7,hi:576.9,w52l:396.25,w52h:609.95,mc:'₹3.00L Cr',pe:22.1,pb:3.8,dy:0.7,beta:0.88,roe:15.6,de:0.2,promo:72.9,pledge:0,sig:'BUY',sc:'buy',cf:71},
{s:'SUNPHARMA',n:'Sun Pharmaceutical Ind.',sec:'Pharma',p:1712.45,ch:9.35,cp:0.55,u:1,lo:1698.1,hi:1722.8,w52l:1161,w52h:1960.95,mc:'₹4.11L Cr',pe:38.4,pb:7.2,dy:0.6,beta:0.68,roe:14.6,de:0.2,promo:54.5,pledge:0,sig:'HOLD',sc:'hold',cf:64},
{s:'TATAMOTORS',n:'Tata Motors Ltd',sec:'Auto',p:987.60,ch:-8.15,cp:-0.82,u:0,lo:978.4,hi:1001.25,w52l:643.05,w52h:1179.05,mc:'₹3.62L Cr',pe:8.2,pb:2.6,dy:0.3,beta:1.31,roe:30.2,de:2.1,promo:46.4,pledge:0,sig:'BUY',sc:'buy',cf:81},
{s:'TITAN',n:'Titan Company Ltd',sec:'Consumer',p:3312.40,ch:24.60,cp:0.75,u:1,lo:3282.1,hi:3328.9,w52l:2780.25,w52h:3886,mc:'₹2.94L Cr',pe:86.4,pb:18.4,dy:0.3,beta:0.96,roe:24.6,de:0.4,promo:52.9,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'AXISBANK',n:'Axis Bank Ltd',sec:'Banking',p:1142.70,ch:8.90,cp:0.78,u:1,lo:1128.35,hi:1153.2,w52l:977.4,w52h:1339.65,mc:'₹3.52L Cr',pe:14.8,pb:2.1,dy:0.2,beta:1.16,roe:16.4,de:8.4,promo:8.2,pledge:0,sig:'BUY',sc:'buy',cf:70},
{s:'ADANIENT',n:'Adani Enterprises Ltd',sec:'Infra',p:2540.15,ch:-36.25,cp:-1.41,u:0,lo:2498.3,hi:2591.7,w52l:2025.9,w52h:3743.9,mc:'₹2.89L Cr',pe:74.8,pb:8.4,dy:0.1,beta:1.58,roe:8.4,de:3.8,promo:72.6,pledge:17.8,sig:'SELL',sc:'sell',cf:76},
{s:'ADANIPORTS',n:'Adani Ports & SEZ Ltd',sec:'Infra',p:1284.60,ch:-14.20,cp:-1.09,u:0,lo:1268.4,hi:1302.8,w52l:841.95,w52h:1608.8,mc:'₹2.77L Cr',pe:26.8,pb:4.2,dy:0.5,beta:1.34,roe:16.2,de:1.2,promo:65.9,pledge:6.4,sig:'HOLD',sc:'hold',cf:58},
{s:'ULTRACEMCO',n:'UltraTech Cement Ltd',sec:'Cement',p:10842.30,ch:64.50,cp:0.60,u:1,lo:10748.6,hi:10894.2,w52l:8309.3,w52h:11828.15,mc:'₹3.13L Cr',pe:46.8,pb:6.8,dy:0.4,beta:0.88,roe:14.8,de:0.4,promo:59.7,pledge:0,sig:'HOLD',sc:'hold',cf:63},
{s:'NESTLEIND',n:'Nestle India Ltd',sec:'FMCG',p:2412.80,ch:-18.40,cp:-0.76,u:0,lo:2388.5,hi:2438.6,w52l:2014.3,w52h:2778.4,mc:'₹2.32L Cr',pe:62.4,pb:82.8,dy:1.8,beta:0.58,roe:138.4,de:0,promo:62.8,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'M&M',n:'Mahindra & Mahindra Ltd',sec:'Auto',p:2892.40,ch:22.80,cp:0.79,u:1,lo:2862.1,hi:2912.4,w52l:1541.05,w52h:3238.9,mc:'₹3.59L Cr',pe:28.4,pb:5.6,dy:0.9,beta:1.14,roe:18.8,de:0.3,promo:18.5,pledge:0,sig:'BUY',sc:'buy',cf:72},
{s:'BAJAJ-AUTO',n:'Bajaj Auto Ltd',sec:'Auto',p:8912.30,ch:48.60,cp:0.55,u:1,lo:8842.5,hi:8962.8,w52l:5706.55,w52h:12774.05,mc:'₹2.50L Cr',pe:32.8,pb:9.2,dy:1.4,beta:0.76,roe:30.4,de:0,promo:54.7,pledge:0,sig:'HOLD',sc:'hold',cf:64},
{s:'HEROMOTOCO',n:'Hero MotoCorp Ltd',sec:'Auto',p:4312.60,ch:28.40,cp:0.66,u:1,lo:4272.3,hi:4342.8,w52l:2809.3,w52h:6246.2,mc:'₹86,252Cr',pe:22.6,pb:6.2,dy:2.8,beta:0.84,roe:28.4,de:0,promo:34.6,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'POWERGRID',n:'Power Grid Corp. of India',sec:'Power',p:312.70,ch:1.40,cp:0.45,u:1,lo:308.9,hi:315.25,w52l:219.45,w52h:366.25,mc:'₹2.91L Cr',pe:16.2,pb:3.1,dy:3.4,beta:0.72,roe:17.8,de:2.1,promo:51.3,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'ONGC',n:'Oil & Natural Gas Corp.',sec:'Energy',p:264.35,ch:1.15,cp:0.44,u:1,lo:260.8,hi:266.7,w52l:184.55,w52h:345,mc:'₹3.32L Cr',pe:8.4,pb:0.9,dy:4.2,beta:1.18,roe:14.2,de:0.6,promo:58.9,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'NTPC',n:'NTPC Ltd',sec:'Power',p:368.45,ch:2.80,cp:0.77,u:1,lo:363.1,hi:371.2,w52l:239.5,w52h:448.45,mc:'₹3.57L Cr',pe:18.4,pb:2.4,dy:1.8,beta:0.91,roe:12.4,de:1.8,promo:51.1,pledge:0,sig:'HOLD',sc:'hold',cf:63},
{s:'CIPLA',n:'Cipla Ltd',sec:'Pharma',p:1484.20,ch:12.80,cp:0.87,u:1,lo:1468.4,hi:1492.6,w52l:1046.1,w52h:1702.05,mc:'₹1.20L Cr',pe:28.6,pb:4.8,dy:0.5,beta:0.74,roe:16.2,de:0.2,promo:33.5,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'DRREDDY',n:"Dr. Reddy's Laboratories",sec:'Pharma',p:1282.40,ch:8.60,cp:0.67,u:1,lo:1268.2,hi:1296.8,w52l:1103.4,w52h:1420.5,mc:'₹2.14L Cr',pe:18.4,pb:3.4,dy:0.6,beta:0.72,roe:20.4,de:0.1,promo:26.7,pledge:0,sig:'BUY',sc:'buy',cf:70},
{s:'COALINDIA',n:'Coal India Ltd',sec:'Mining',p:484.20,ch:-4.80,cp:-0.98,u:0,lo:476.4,hi:492.6,w52l:388.25,w52h:543.55,mc:'₹2.98L Cr',pe:7.8,pb:3.2,dy:6.4,beta:1.04,roe:50.8,de:0,promo:63.1,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'GRASIM',n:'Grasim Industries Ltd',sec:'Cement',p:2648.30,ch:18.40,cp:0.70,u:1,lo:2618.5,hi:2668.6,w52l:1862.35,w52h:2994.5,mc:'₹1.74L Cr',pe:22.8,pb:2.2,dy:0.5,beta:1.06,roe:9.8,de:0.4,promo:43.3,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'HINDALCO',n:'Hindalco Industries Ltd',sec:'Metals',p:688.40,ch:6.80,cp:1.00,u:1,lo:678.2,hi:694.8,w52l:468.15,w52h:761.4,mc:'₹1.55L Cr',pe:14.4,pb:1.6,dy:0.6,beta:1.28,roe:11.4,de:1.2,promo:34.6,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'TATASTEEL',n:'Tata Steel Ltd',sec:'Metals',p:148.60,ch:1.80,cp:1.22,u:1,lo:145.8,hi:150.4,w52l:125.15,w52h:184.6,mc:'₹1.85L Cr',pe:42.6,pb:1.8,dy:0.4,beta:1.42,roe:4.2,de:2.8,promo:33.1,pledge:1.2,sig:'HOLD',sc:'hold',cf:58},
{s:'JSWSTEEL',n:'JSW Steel Ltd',sec:'Metals',p:942.80,ch:8.40,cp:0.90,u:1,lo:932.5,hi:952.4,w52l:718.35,w52h:1063.2,mc:'₹2.30L Cr',pe:22.4,pb:2.8,dy:0.4,beta:1.38,roe:12.8,de:1.8,promo:44.8,pledge:4.2,sig:'HOLD',sc:'hold',cf:59},
{s:'INDUSINDBK',n:'IndusInd Bank Ltd',sec:'Banking',p:1048.30,ch:-14.60,cp:-1.37,u:0,lo:1034.8,hi:1068.4,w52l:926.55,w52h:1694.5,mc:'₹81,432Cr',pe:10.8,pb:1.4,dy:1.4,beta:1.32,roe:14.2,de:7.6,promo:16.5,pledge:0,sig:'HOLD',sc:'hold',cf:56},
{s:'EICHERMOT',n:'Eicher Motors Ltd',sec:'Auto',p:4912.80,ch:38.40,cp:0.79,u:1,lo:4874.3,hi:4938.6,w52l:3561.15,w52h:5725.9,mc:'₹1.34L Cr',pe:28.4,pb:7.8,dy:0.6,beta:0.86,roe:28.4,de:0,promo:49.5,pledge:0,sig:'BUY',sc:'buy',cf:71},
{s:'BRITANNIA',n:'Britannia Industries Ltd',sec:'FMCG',p:5142.60,ch:-28.40,cp:-0.55,u:0,lo:5088.4,hi:5182.8,w52l:4502.6,w52h:6000.2,mc:'₹1.24L Cr',pe:52.4,pb:40.6,dy:1.6,beta:0.62,roe:82.4,de:0.4,promo:50.7,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'APOLLOHOSP',n:'Apollo Hospitals Enterprise',sec:'Healthcare',p:6842.30,ch:48.60,cp:0.71,u:1,lo:6782.4,hi:6882.8,w52l:5319.4,w52h:7545.85,mc:'₹98,432Cr',pe:84.2,pb:14.8,dy:0.2,beta:0.88,roe:17.8,de:0.8,promo:29.3,pledge:0,sig:'BUY',sc:'buy',cf:71},
{s:'TATACONSUM',n:'Tata Consumer Products',sec:'FMCG',p:1084.60,ch:8.40,cp:0.78,u:1,lo:1072.3,hi:1092.8,w52l:861.4,w52h:1299.2,mc:'₹97,614Cr',pe:68.4,pb:6.2,dy:0.8,beta:0.82,roe:9.2,de:0.2,promo:34.7,pledge:0,sig:'BUY',sc:'buy',cf:67},
{s:'BAJAJFINSV',n:'Bajaj Finserv Ltd',sec:'NBFC',p:1762.85,ch:-8.40,cp:-0.47,u:0,lo:1742.2,hi:1779.5,w52l:1419.1,w52h:2029.95,mc:'₹2.81L Cr',pe:22.4,pb:4.1,dy:0.1,beta:1.08,roe:18.4,de:2.8,promo:60.7,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'SBILIFE',n:'SBI Life Insurance Co.',sec:'Insurance',p:1512.40,ch:10.20,cp:0.68,u:1,lo:1498.6,hi:1524.8,w52l:1196.1,w52h:1921.4,mc:'₹1.51L Cr',pe:74.2,pb:12.8,dy:0.0,beta:0.84,roe:17.4,de:0,promo:57.7,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'HDFCLIFE',n:'HDFC Life Insurance Co.',sec:'Insurance',p:682.40,ch:4.80,cp:0.71,u:1,lo:674.2,hi:688.6,w52l:511.25,w52h:761.45,mc:'₹1.46L Cr',pe:88.4,pb:11.2,dy:0.3,beta:0.82,roe:13.2,de:0,promo:50.4,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'DMART',n:'Avenue Supermarts Ltd',sec:'Retail',p:4612.80,ch:32.40,cp:0.71,u:1,lo:4572.4,hi:4648.6,w52l:3628.25,w52h:5484.7,mc:'₹2.99L Cr',pe:106.4,pb:18.4,dy:0,beta:0.68,roe:17.4,de:0,promo:74.7,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'DIVISLAB',n:"Divi's Laboratories Ltd",sec:'Pharma',p:5248.40,ch:36.80,cp:0.71,u:1,lo:5198.6,hi:5284.8,w52l:3422.5,w52h:5694.5,mc:'₹1.40L Cr',pe:56.8,pb:8.6,dy:0.7,beta:0.72,roe:15.4,de:0,promo:51.9,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'BPCL',n:'Bharat Petroleum Corp.',sec:'Energy',p:312.40,ch:2.80,cp:0.90,u:1,lo:308.2,hi:316.8,w52l:243.35,w52h:376.95,mc:'₹1.35L Cr',pe:7.2,pb:1.4,dy:5.4,beta:1.22,roe:19.4,de:0.8,promo:52.9,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'TECHM',n:'Tech Mahindra Ltd',sec:'IT',p:1648.20,ch:18.40,cp:1.13,u:1,lo:1624.6,hi:1662.8,w52l:1105.4,w52h:1768.45,mc:'₹1.60L Cr',pe:32.4,pb:4.8,dy:1.2,beta:1.04,roe:14.8,de:0.1,promo:35.2,pledge:0,sig:'BUY',sc:'buy',cf:66},
/* ── NIFTY NEXT 50 & POPULAR LARGE CAPS ── */
{s:'ZOMATO',n:'Zomato Ltd',sec:'Consumer Tech',p:248.40,ch:4.80,cp:1.97,u:1,lo:243.2,hi:252.8,w52l:127.9,w52h:299.7,mc:'₹2.19L Cr',pe:484.2,pb:10.8,dy:0,beta:1.48,roe:2.2,de:0,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:56},
{s:'PAYTM',n:'One 97 Communications Ltd',sec:'Fintech',p:784.20,ch:-12.40,cp:-1.56,u:0,lo:772.4,hi:798.6,w52l:310.0,w52h:998.3,mc:'₹49,858Cr',pe:0,pb:2.8,dy:0,beta:1.84,roe:-12.4,de:0,promo:13.5,pledge:0,sig:'WATCH',sc:'watch',cf:48},
{s:'NYKAA',n:'FSN E-Commerce Ventures',sec:'Consumer Tech',p:168.40,ch:2.40,cp:1.45,u:1,lo:164.6,hi:170.8,w52l:128.45,w52h:230.1,mc:'₹48,124Cr',pe:312.4,pb:12.4,dy:0,beta:1.42,roe:4.2,de:0.1,promo:52.6,pledge:0,sig:'WATCH',sc:'watch',cf:50},
{s:'PIDILITIND',n:'Pidilite Industries Ltd',sec:'Chemicals',p:2984.60,ch:18.40,cp:0.62,u:1,lo:2958.4,hi:3004.8,w52l:2527.15,w52h:3443.25,mc:'₹1.52L Cr',pe:82.4,pb:16.8,dy:0.5,beta:0.68,roe:22.4,de:0,promo:70.5,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'HAVELLS',n:'Havells India Ltd',sec:'Capital Goods',p:1648.40,ch:12.60,cp:0.77,u:1,lo:1632.8,hi:1662.6,w52l:1275.3,w52h:2029.5,mc:'₹1.04L Cr',pe:62.8,pb:14.2,dy:0.6,beta:0.86,roe:22.8,de:0,promo:59.7,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'SIEMENS',n:'Siemens Ltd',sec:'Capital Goods',p:6412.80,ch:48.40,cp:0.76,u:1,lo:6352.4,hi:6468.6,w52l:4302.5,w52h:8274.6,mc:'₹2.28L Cr',pe:68.4,pb:12.8,dy:0.6,beta:0.88,roe:18.8,de:0,promo:75.0,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'ABB',n:'ABB India Ltd',sec:'Capital Goods',p:7248.60,ch:56.40,cp:0.78,u:1,lo:7182.4,hi:7298.8,w52l:4268.5,w52h:9444.8,mc:'₹1.54L Cr',pe:74.8,pb:18.4,dy:0.3,beta:0.84,roe:24.8,de:0,promo:75.0,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'GODREJCP',n:'Godrej Consumer Products',sec:'FMCG',p:1184.60,ch:8.40,cp:0.71,u:1,lo:1172.8,hi:1196.4,w52l:928.45,w52h:1532.5,mc:'₹1.21L Cr',pe:52.4,pb:9.8,dy:0.8,beta:0.72,roe:18.8,de:0.4,promo:62.9,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'MARICO',n:'Marico Ltd',sec:'FMCG',p:648.40,ch:4.20,cp:0.65,u:1,lo:640.2,hi:654.8,w52l:477.5,w52h:722.8,mc:'₹83,892Cr',pe:48.4,pb:14.8,dy:1.6,beta:0.64,roe:32.4,de:0,promo:59.6,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'DABUR',n:'Dabur India Ltd',sec:'FMCG',p:548.40,ch:3.80,cp:0.70,u:1,lo:542.2,hi:554.6,w52l:467.1,w52h:665.7,mc:'₹97,216Cr',pe:48.4,pb:9.2,dy:1.0,beta:0.62,roe:19.2,de:0,promo:67.9,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'COLPAL',n:'Colgate-Palmolive India',sec:'FMCG',p:2812.60,ch:18.40,cp:0.66,u:1,lo:2786.4,hi:2832.8,w52l:2197.7,w52h:3890.2,mc:'₹76,342Cr',pe:54.2,pb:28.4,dy:1.4,beta:0.58,roe:58.4,de:0,promo:51.0,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'BERGEPAINT',n:'Berger Paints India Ltd',sec:'Consumer',p:548.40,ch:3.60,cp:0.66,u:1,lo:542.6,hi:554.2,w52l:448.3,w52h:748.4,mc:'₹65,142Cr',pe:58.4,pb:12.8,dy:0.6,beta:0.74,roe:22.4,de:0,promo:75.0,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'ASIANPAINT',n:'Asian Paints Ltd',sec:'Consumer',p:2412.40,ch:-18.60,cp:-0.77,u:0,lo:2388.2,hi:2442.8,w52l:2026.6,w52h:3394.2,mc:'₹2.31L Cr',pe:52.4,pb:12.4,dy:0.8,beta:0.68,roe:22.8,de:0,promo:52.8,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'INDIGO',n:'InterGlobe Aviation Ltd',sec:'Aviation',p:4248.60,ch:38.40,cp:0.91,u:1,lo:4202.4,hi:4278.8,w52l:2771.3,w52h:5280.65,mc:'₹1.64L Cr',pe:22.4,pb:18.4,dy:0,beta:1.28,roe:82.4,de:1.8,promo:37.8,pledge:0,sig:'BUY',sc:'buy',cf:69},
{s:'VEDL',n:'Vedanta Ltd',sec:'Metals',p:448.20,ch:6.40,cp:1.45,u:1,lo:440.8,hi:454.6,w52l:229.6,w52h:526.9,mc:'₹1.66L Cr',pe:12.4,pb:2.8,dy:8.2,beta:1.48,roe:22.4,de:2.4,promo:56.4,pledge:18.4,sig:'HOLD',sc:'hold',cf:54},
{s:'RECLTD',n:'REC Ltd',sec:'NBFC',p:512.40,ch:4.80,cp:0.94,u:1,lo:504.8,hi:518.6,w52l:378.75,w52h:654.7,mc:'₹1.35L Cr',pe:8.4,pb:1.8,dy:3.8,beta:1.28,roe:22.4,de:8.4,promo:52.6,pledge:0,sig:'BUY',sc:'buy',cf:71},
{s:'PFC',n:'Power Finance Corp. Ltd',sec:'NBFC',p:484.20,ch:4.40,cp:0.92,u:1,lo:476.8,hi:490.4,w52l:362.55,w52h:580.3,mc:'₹1.60L Cr',pe:7.4,pb:1.6,dy:3.4,beta:1.32,roe:22.8,de:9.6,promo:55.9,pledge:0,sig:'BUY',sc:'buy',cf:70},
{s:'IRCTC',n:'Indian Railway Catering Corp.',sec:'Travel',p:812.40,ch:6.80,cp:0.84,u:1,lo:802.4,hi:820.6,w52l:633.15,w52h:1104.25,mc:'₹65,142Cr',pe:48.4,pb:14.8,dy:1.4,beta:0.92,roe:32.8,de:0,promo:67.4,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'HAL',n:'Hindustan Aeronautics Ltd',sec:'Defence',p:4212.60,ch:38.40,cp:0.92,u:1,lo:4168.4,hi:4248.8,w52l:2748.5,w52h:5675.6,mc:'₹2.82L Cr',pe:38.4,pb:11.8,dy:0.8,beta:1.12,roe:30.8,de:0,promo:71.6,pledge:0,sig:'BUY',sc:'buy',cf:74},
{s:'BEL',n:'Bharat Electronics Ltd',sec:'Defence',p:284.20,ch:2.40,cp:0.85,u:1,lo:280.4,hi:287.8,w52l:165.35,w52h:340.35,mc:'₹2.07L Cr',pe:44.2,pb:10.8,dy:0.8,beta:1.08,roe:24.4,de:0,promo:51.1,pledge:0,sig:'BUY',sc:'buy',cf:72},
{s:'POLYCAB',n:'Polycab India Ltd',sec:'Capital Goods',p:6412.80,ch:48.40,cp:0.76,u:1,lo:6352.4,hi:6468.8,w52l:4022.3,w52h:7605.35,mc:'₹96,542Cr',pe:48.4,pb:10.8,dy:0.4,beta:0.94,roe:22.4,de:0,promo:66.6,pledge:0,sig:'BUY',sc:'buy',cf:73},
/* ── IT & TECHNOLOGY ── */
{s:'LTIM',n:'LTIMindtree Ltd',sec:'IT',p:5842.30,ch:88.40,cp:1.54,u:1,lo:5726.55,hi:5871.9,w52l:4002.6,w52h:6407.15,mc:'₹1.73L Cr',pe:34.2,pb:8.6,dy:1.1,beta:1.02,roe:24.2,de:0.1,promo:68.6,pledge:0,sig:'BUY',sc:'buy',cf:72},
{s:'PERSISTENT',n:'Persistent Systems Ltd',sec:'IT',p:5412.60,ch:76.20,cp:1.43,u:1,lo:5318.4,hi:5440.25,w52l:3214.8,w52h:6788.15,mc:'₹83,240Cr',pe:58.6,pb:14.8,dy:0.4,beta:1.08,roe:26.4,de:0.1,promo:31.2,pledge:0,sig:'BUY',sc:'buy',cf:81},
{s:'MPHASIS',n:'Mphasis Ltd',sec:'IT',p:2648.40,ch:24.80,cp:0.94,u:1,lo:2618.2,hi:2668.6,w52l:1808.3,w52h:3027.85,mc:'₹49,842Cr',pe:38.4,pb:8.2,dy:1.2,beta:0.98,roe:21.4,de:0,promo:55.7,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'COFORGE',n:'Coforge Ltd',sec:'IT',p:7248.40,ch:84.60,cp:1.18,u:1,lo:7148.2,hi:7314.8,w52l:4327.3,w52h:9355.5,mc:'₹45,342Cr',pe:56.4,pb:14.2,dy:0.6,beta:1.12,roe:24.8,de:0.2,promo:63.1,pledge:0,sig:'BUY',sc:'buy',cf:74},
{s:'TATAELXSI',n:'Tata Elxsi Ltd',sec:'IT',p:6842.60,ch:68.40,cp:1.01,u:1,lo:6764.4,hi:6892.8,w52l:5584.0,w52h:9082.5,mc:'₹42,562Cr',pe:48.4,pb:14.8,dy:1.2,beta:1.04,roe:30.4,de:0,promo:43.9,pledge:0,sig:'BUY',sc:'buy',cf:71},
{s:'KPITTECH',n:'KPIT Technologies Ltd',sec:'IT',p:1548.20,ch:22.40,cp:1.47,u:1,lo:1522.4,hi:1564.6,w52l:878.4,w52h:1975.85,mc:'₹42,124Cr',pe:82.4,pb:22.8,dy:0.2,beta:1.28,roe:26.4,de:0,promo:38.4,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'OFSS',n:'Oracle Financial Services Software',sec:'IT',p:10484.60,ch:84.40,cp:0.81,u:1,lo:10384.2,hi:10548.8,w52l:7030.6,w52h:11900.0,mc:'₹90,542Cr',pe:36.4,pb:10.8,dy:5.2,beta:0.74,roe:30.8,de:0,promo:72.8,pledge:0,sig:'HOLD',sc:'hold',cf:65},
{s:'HEXAWARE',n:'Hexaware Technologies Ltd',sec:'IT',p:748.60,ch:8.40,cp:1.13,u:1,lo:738.4,hi:756.8,w52l:574.55,w52h:928.45,mc:'₹45,232Cr',pe:32.4,pb:7.2,dy:0.8,beta:0.96,roe:22.4,de:0,promo:74.9,pledge:0,sig:'BUY',sc:'buy',cf:67},
{s:'SONATSOFTW',n:'Sonata Software Ltd',sec:'IT',p:548.40,ch:6.40,cp:1.18,u:1,lo:540.2,hi:556.8,w52l:390.5,w52h:830.4,mc:'₹5,842Cr',pe:28.4,pb:6.2,dy:1.8,beta:1.04,roe:28.4,de:0,promo:28.2,pledge:0,sig:'BUY',sc:'buy',cf:66},
{s:'CYIENT',n:'Cyient Ltd',sec:'IT',p:1648.40,ch:18.40,cp:1.13,u:1,lo:1628.2,hi:1664.8,w52l:1152.5,w52h:2388.85,mc:'₹18,242Cr',pe:24.8,pb:4.8,dy:1.4,beta:0.98,roe:18.4,de:0,promo:23.4,pledge:0,sig:'BUY',sc:'buy',cf:65},
{s:'MASTEK',n:'Mastek Ltd',sec:'IT',p:2948.40,ch:32.40,cp:1.11,u:1,lo:2912.2,hi:2972.8,w52l:2028.35,w52h:3842.85,mc:'₹8,642Cr',pe:22.4,pb:5.8,dy:1.2,beta:0.96,roe:22.8,de:0,promo:52.9,pledge:0,sig:'BUY',sc:'buy',cf:66},
{s:'INTELLECT',n:'Intellect Design Arena Ltd',sec:'IT',p:748.20,ch:8.40,cp:1.13,u:1,lo:738.6,hi:756.8,w52l:490.25,w52h:1080.5,mc:'₹11,542Cr',pe:42.4,pb:6.4,dy:0.2,beta:1.14,roe:16.4,de:0,promo:34.3,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'ZENSAR',n:'Zensar Technologies Ltd',sec:'IT',p:648.40,ch:7.20,cp:1.12,u:1,lo:640.2,hi:656.8,w52l:483.9,w52h:850.0,mc:'₹14,542Cr',pe:28.4,pb:5.8,dy:0.8,beta:0.96,roe:18.8,de:0,promo:49.2,pledge:0,sig:'HOLD',sc:'hold',cf:61},
/* ── BANKING & FINANCE ── */
{s:'BANDHANBNK',n:'Bandhan Bank Ltd',sec:'Banking',p:184.60,ch:-2.40,cp:-1.28,u:0,lo:180.8,hi:188.4,w52l:156.95,w52h:248.9,mc:'₹29,742Cr',pe:12.4,pb:1.4,dy:0,beta:1.42,roe:11.4,de:8.4,promo:39.9,pledge:0,sig:'HOLD',sc:'hold',cf:52},
{s:'FEDERALBNK',n:'Federal Bank Ltd',sec:'Banking',p:184.20,ch:1.40,cp:0.77,u:1,lo:181.6,hi:186.8,w52l:143.05,w52h:213.55,mc:'₹44,232Cr',pe:11.4,pb:1.4,dy:1.4,beta:1.08,roe:13.4,de:8.6,promo:0,pledge:0,sig:'BUY',sc:'buy',cf:66},
{s:'IDFCFIRSTB',n:'IDFC First Bank Ltd',sec:'Banking',p:68.40,ch:-0.80,cp:-1.16,u:0,lo:67.2,hi:69.4,w52l:55.3,w52h:91.2,mc:'₹45,642Cr',pe:22.4,pb:1.2,dy:0,beta:1.38,roe:6.4,de:10.4,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:52},
{s:'YESBANK',n:'Yes Bank Ltd',sec:'Banking',p:18.40,ch:-0.20,cp:-1.08,u:0,lo:18.0,hi:18.8,w52l:12.05,w52h:32.85,mc:'₹57,842Cr',pe:26.4,pb:1.2,dy:0,beta:1.84,roe:4.4,de:14.4,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:40},
{s:'PNB',n:'Punjab National Bank',sec:'Banking',p:104.60,ch:0.80,cp:0.77,u:1,lo:102.8,hi:106.4,w52l:83.65,w52h:142.9,mc:'₹1.21L Cr',pe:9.4,pb:1.0,dy:1.0,beta:1.42,roe:10.8,de:15.4,promo:73.2,pledge:0,sig:'HOLD',sc:'hold',cf:56},
{s:'BANKBARODA',n:'Bank of Baroda',sec:'Banking',p:248.40,ch:1.60,cp:0.65,u:1,lo:244.8,hi:252.2,w52l:196.55,w52h:299.25,mc:'₹1.28L Cr',pe:6.8,pb:1.0,dy:3.4,beta:1.28,roe:15.4,de:12.8,promo:63.9,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'CANARABANK',n:'Canara Bank',sec:'Banking',p:102.40,ch:0.60,cp:0.59,u:1,lo:100.8,hi:104.2,w52l:79.4,w52h:128.9,mc:'₹92,842Cr',pe:5.8,pb:0.8,dy:3.2,beta:1.38,roe:14.4,de:15.8,promo:62.9,pledge:0,sig:'HOLD',sc:'hold',cf:57},
{s:'UNIONBANK',n:'Union Bank of India',sec:'Banking',p:118.40,ch:0.80,cp:0.68,u:1,lo:116.2,hi:120.6,w52l:93.25,w52h:169.95,mc:'₹88,542Cr',pe:6.4,pb:0.9,dy:2.4,beta:1.44,roe:13.4,de:14.6,promo:74.8,pledge:0,sig:'HOLD',sc:'hold',cf:56},
{s:'AUBANK',n:'AU Small Finance Bank Ltd',sec:'Banking',p:684.20,ch:5.40,cp:0.80,u:1,lo:676.4,hi:692.8,w52l:529.0,w52h:813.8,mc:'₹47,842Cr',pe:28.4,pb:3.4,dy:0,beta:1.18,roe:12.4,de:6.8,promo:26.2,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'RBLBANK',n:'RBL Bank Ltd',sec:'Banking',p:218.40,ch:-2.40,cp:-1.09,u:0,lo:214.8,hi:222.6,w52l:148.2,w52h:310.6,mc:'₹13,242Cr',pe:14.4,pb:0.9,dy:0,beta:1.52,roe:6.4,de:10.8,promo:0,pledge:0,sig:'HOLD',sc:'hold',cf:44},
{s:'MUTHOOTFIN',n:'Muthoot Finance Ltd',sec:'NBFC',p:1984.60,ch:18.40,cp:0.93,u:1,lo:1964.2,hi:2004.8,w52l:1302.1,w52h:2237.3,mc:'₹79,742Cr',pe:18.4,pb:3.8,dy:1.2,beta:0.94,roe:22.4,de:2.8,promo:73.4,pledge:0,sig:'BUY',sc:'buy',cf:71},
{s:'CHOLAFIN',n:'Cholamandalam Investment',sec:'NBFC',p:1448.60,ch:12.40,cp:0.86,u:1,lo:1432.4,hi:1462.8,w52l:1052.7,w52h:1652.8,mc:'₹1.20L Cr',pe:28.4,pb:5.8,dy:0.4,beta:1.14,roe:20.4,de:5.8,promo:51.8,pledge:0,sig:'BUY',sc:'buy',cf:70},
{s:'MANAPPURAM',n:'Manappuram Finance Ltd',sec:'NBFC',p:184.60,ch:1.80,cp:0.98,u:1,lo:181.8,hi:186.8,w52l:146.25,w52h:230.85,mc:'₹15,642Cr',pe:8.4,pb:1.6,dy:2.4,beta:1.12,roe:19.4,de:3.4,promo:35.2,pledge:0,sig:'BUY',sc:'buy',cf:65},
{s:'M&MFIN',n:'Mahindra & Mahindra Fin.',sec:'NBFC',p:284.40,ch:2.40,cp:0.85,u:1,lo:280.6,hi:288.4,w52l:228.7,w52h:334.8,mc:'₹35,242Cr',pe:16.4,pb:1.8,dy:1.4,beta:1.18,roe:11.4,de:5.4,promo:52.2,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'LICHOUSGFIN',n:'LIC Housing Finance Ltd',sec:'NBFC',p:648.40,ch:4.80,cp:0.75,u:1,lo:640.6,hi:656.8,w52l:508.4,w52h:838.65,mc:'₹35,742Cr',pe:9.4,pb:1.0,dy:2.2,beta:1.08,roe:11.4,de:9.4,promo:45.2,pledge:0,sig:'HOLD',sc:'hold',cf:58},
/* ── PHARMA & HEALTHCARE ── */
{s:'LUPIN',n:'Lupin Ltd',sec:'Pharma',p:1948.60,ch:14.40,cp:0.74,u:1,lo:1928.4,hi:1964.8,w52l:1256.0,w52h:2312.8,mc:'₹88,542Cr',pe:32.4,pb:6.4,dy:0.4,beta:0.76,roe:19.8,de:0.2,promo:46.9,pledge:0,sig:'BUY',sc:'buy',cf:69},
{s:'BIOCON',n:'Biocon Ltd',sec:'Pharma',p:348.40,ch:2.80,cp:0.81,u:1,lo:343.4,hi:352.8,w52l:225.1,w52h:388.5,mc:'₹41,842Cr',pe:48.4,pb:3.8,dy:0,beta:0.88,roe:8.4,de:0.8,promo:60.8,pledge:0,sig:'HOLD',sc:'hold',cf:55},
{s:'AUROPHARMA',n:'Aurobindo Pharma Ltd',sec:'Pharma',p:1148.40,ch:8.40,cp:0.74,u:1,lo:1136.4,hi:1158.8,w52l:780.1,w52h:1428.55,mc:'₹67,342Cr',pe:14.4,pb:2.4,dy:0.4,beta:0.82,roe:17.4,de:0.4,promo:51.8,pledge:0,sig:'BUY',sc:'buy',cf:67},
{s:'TORNTPHARM',n:'Torrent Pharmaceuticals',sec:'Pharma',p:3312.60,ch:24.40,cp:0.74,u:1,lo:3280.4,hi:3338.8,w52l:2414.9,w52h:3792.95,mc:'₹56,242Cr',pe:38.4,pb:7.2,dy:0.6,beta:0.72,roe:18.8,de:0.4,promo:71.2,pledge:0,sig:'HOLD',sc:'hold',cf:63},
{s:'ALKEM',n:'Alkem Laboratories Ltd',sec:'Pharma',p:5512.60,ch:38.40,cp:0.70,u:1,lo:5464.4,hi:5556.8,w52l:4246.5,w52h:6382.3,mc:'₹66,142Cr',pe:28.4,pb:5.8,dy:0.8,beta:0.68,roe:20.8,de:0,promo:56.2,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'IPCALAB',n:'IPCA Laboratories Ltd',sec:'Pharma',p:1648.40,ch:12.40,cp:0.76,u:1,lo:1630.2,hi:1662.8,w52l:1087.6,w52h:1927.7,mc:'₹20,942Cr',pe:38.4,pb:4.8,dy:0.4,beta:0.74,roe:12.4,de:0,promo:46.7,pledge:0,sig:'BUY',sc:'buy',cf:65},
{s:'GRANULES',n:'Granules India Ltd',sec:'Pharma',p:548.40,ch:4.80,cp:0.88,u:1,lo:540.6,hi:556.8,w52l:392.25,w52h:721.05,mc:'₹13,642Cr',pe:22.4,pb:4.2,dy:0.4,beta:0.88,roe:18.4,de:0.4,promo:42.0,pledge:0,sig:'BUY',sc:'buy',cf:64},
{s:'LAURUS',n:'Laurus Labs Ltd',sec:'Pharma',p:584.40,ch:5.60,cp:0.97,u:1,lo:576.4,hi:592.8,w52l:398.9,w52h:755.35,mc:'₹31,542Cr',pe:42.4,pb:6.8,dy:0,beta:0.94,roe:16.4,de:0.4,promo:27.2,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'NATCOPHARM',n:'Natco Pharma Ltd',sec:'Pharma',p:1284.60,ch:10.40,cp:0.82,u:1,lo:1270.4,hi:1298.8,w52l:798.35,w52h:1635.6,mc:'₹22,742Cr',pe:18.4,pb:4.2,dy:0.6,beta:0.86,roe:22.4,de:0,promo:50.1,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'AJANTPHARM',n:'Ajanta Pharma Ltd',sec:'Pharma',p:2612.40,ch:20.40,cp:0.79,u:1,lo:2585.2,hi:2634.8,w52l:2001.0,w52h:3388.5,mc:'₹24,242Cr',pe:28.4,pb:7.8,dy:0.8,beta:0.72,roe:24.4,de:0,promo:67.2,pledge:0,sig:'BUY',sc:'buy',cf:69},
{s:'METROPOLIS',n:'Metropolis Healthcare Ltd',sec:'Healthcare',p:1784.60,ch:12.40,cp:0.70,u:1,lo:1764.4,hi:1800.8,w52l:1273.5,w52h:2196.5,mc:'₹9,142Cr',pe:58.4,pb:8.4,dy:0.8,beta:0.76,roe:14.8,de:0,promo:49.8,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'DRLABONE',n:'Dr. Lal PathLabs Ltd',sec:'Healthcare',p:2248.60,ch:16.40,cp:0.74,u:1,lo:2224.4,hi:2268.8,w52l:1793.4,w52h:2926.8,mc:'₹18,742Cr',pe:58.4,pb:14.8,dy:0.8,beta:0.72,roe:25.4,de:0,promo:54.6,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'FORTIS',n:'Fortis Healthcare Ltd',sec:'Healthcare',p:648.40,ch:4.80,cp:0.75,u:1,lo:640.4,hi:656.6,w52l:393.35,w52h:712.3,mc:'₹49,142Cr',pe:74.2,pb:5.4,dy:0,beta:0.94,roe:7.4,de:0.4,promo:31.2,pledge:0,sig:'HOLD',sc:'hold',cf:55},
{s:'MAXHEALTH',n:'Max Healthcare Institute',sec:'Healthcare',p:948.40,ch:6.80,cp:0.72,u:1,lo:937.6,hi:958.8,w52l:602.5,w52h:1099.7,mc:'₹91,942Cr',pe:98.4,pb:12.4,dy:0,beta:0.88,roe:12.4,de:0.2,promo:22.8,pledge:0,sig:'HOLD',sc:'hold',cf:57},
/* ── AUTO & AUTO ANCILLARIES ── */
{s:'TVSMOTOR',n:'TVS Motor Company Ltd',sec:'Auto',p:2412.80,ch:18.40,cp:0.77,u:1,lo:2388.2,hi:2432.8,w52l:1641.35,w52h:2958.25,mc:'₹1.14L Cr',pe:44.8,pb:12.4,dy:0.4,beta:1.02,roe:28.4,de:0.4,promo:57.4,pledge:0,sig:'HOLD',sc:'hold',cf:63},
{s:'ASHOKLEY',n:'Ashok Leyland Ltd',sec:'Auto',p:228.40,ch:2.40,cp:1.06,u:1,lo:224.8,hi:231.8,w52l:157.1,w52h:268.65,mc:'₹67,342Cr',pe:24.4,pb:5.2,dy:1.4,beta:1.22,roe:21.4,de:0.6,promo:51.5,pledge:0,sig:'BUY',sc:'buy',cf:67},
{s:'BHARATFORG',n:'Bharat Forge Ltd',sec:'Auto',p:1284.60,ch:10.40,cp:0.82,u:1,lo:1268.4,hi:1298.8,w52l:940.0,w52h:1798.25,mc:'₹59,842Cr',pe:48.4,pb:8.4,dy:0.6,beta:1.14,roe:17.8,de:0.8,promo:45.3,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'MOTHERSON',n:'Samvardhana Motherson Intl',sec:'Auto',p:148.40,ch:1.60,cp:1.09,u:1,lo:145.8,hi:150.8,w52l:109.7,w52h:224.65,mc:'₹48,842Cr',pe:42.4,pb:4.4,dy:0.4,beta:1.32,roe:10.4,de:1.4,promo:62.8,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'BOSCHLTD',n:'Bosch Ltd',sec:'Auto',p:35412.60,ch:248.40,cp:0.71,u:1,lo:35098.4,hi:35648.8,w52l:26800.0,w52h:39284.4,mc:'₹1.05L Cr',pe:48.4,pb:8.4,dy:0.8,beta:0.76,roe:17.8,de:0,promo:71.0,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'EXIDEIND',n:'Exide Industries Ltd',sec:'Auto',p:448.40,ch:4.40,cp:0.99,u:1,lo:442.4,hi:454.8,w52l:289.6,w52h:618.75,mc:'₹38,142Cr',pe:38.4,pb:4.4,dy:0.8,beta:0.88,roe:11.8,de:0,promo:46.0,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'SUNDARMFIN',n:'Sundaram Finance Ltd',sec:'NBFC',p:4812.80,ch:38.40,cp:0.80,u:1,lo:4762.4,hi:4858.8,w52l:3784.5,w52h:6148.95,mc:'₹53,642Cr',pe:28.4,pb:4.8,dy:0.8,beta:0.78,roe:17.4,de:3.8,promo:38.5,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'ESCORTS',n:'Escorts Kubota Ltd',sec:'Auto',p:3248.40,ch:24.40,cp:0.76,u:1,lo:3212.4,hi:3280.8,w52l:2611.65,w52h:3928.4,mc:'₹37,542Cr',pe:28.4,pb:3.8,dy:0.4,beta:0.92,roe:13.8,de:0,promo:47.4,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'TIINDIA',n:'Tube Investments of India',sec:'Auto',p:3812.60,ch:32.40,cp:0.86,u:1,lo:3772.4,hi:3848.8,w52l:2964.3,w52h:4595.65,mc:'₹59,342Cr',pe:58.4,pb:14.4,dy:0.2,beta:0.96,roe:24.8,de:0,promo:44.8,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'CRAFTSMAN',n:'Craftsman Automation Ltd',sec:'Auto',p:4812.60,ch:44.40,cp:0.93,u:1,lo:4758.4,hi:4862.8,w52l:3518.3,w52h:5736.5,mc:'₹9,842Cr',pe:28.4,pb:5.8,dy:0.4,beta:1.08,roe:22.4,de:0.8,promo:59.1,pledge:0,sig:'BUY',sc:'buy',cf:67},
/* ── ENERGY & POWER ── */
{s:'IOC',n:'Indian Oil Corporation Ltd',sec:'Energy',p:148.40,ch:1.20,cp:0.81,u:1,lo:146.2,hi:150.4,w52l:111.35,w52h:196.8,mc:'₹2.10L Cr',pe:5.8,pb:0.9,dy:8.4,beta:1.18,roe:15.4,de:0.8,promo:51.5,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'HINDPETRO',n:'Hindustan Petroleum Corp.',sec:'Energy',p:384.40,ch:3.40,cp:0.89,u:1,lo:378.6,hi:390.4,w52l:254.65,w52h:457.7,mc:'₹81,742Cr',pe:6.4,pb:1.0,dy:6.4,beta:1.28,roe:15.8,de:0.8,promo:54.9,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'GAIL',n:'GAIL India Ltd',sec:'Energy',p:212.40,ch:1.60,cp:0.76,u:1,lo:209.6,hi:214.8,w52l:152.3,w52h:246.35,mc:'₹1.40L Cr',pe:14.4,pb:1.6,dy:3.2,beta:0.92,roe:11.4,de:0.2,promo:51.9,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'PETRONET',n:'Petronet LNG Ltd',sec:'Energy',p:348.40,ch:2.80,cp:0.81,u:1,lo:343.6,hi:353.2,w52l:229.85,w52h:384.5,mc:'₹52,260Cr',pe:12.4,pb:2.4,dy:4.2,beta:0.82,roe:19.4,de:0,promo:50.0,pledge:0,sig:'HOLD',sc:'hold',cf:63},
{s:'IGL',n:'Indraprastha Gas Ltd',sec:'Energy',p:412.40,ch:3.40,cp:0.83,u:1,lo:406.4,hi:418.6,w52l:327.15,w52h:538.35,mc:'₹28,942Cr',pe:22.4,pb:4.8,dy:0.8,beta:0.78,roe:21.4,de:0,promo:45.0,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'MGL',n:'Mahanagar Gas Ltd',sec:'Energy',p:1648.40,ch:12.40,cp:0.76,u:1,lo:1628.6,hi:1664.8,w52l:1012.4,w52h:1973.5,mc:'₹16,284Cr',pe:18.4,pb:4.8,dy:2.2,beta:0.72,roe:27.4,de:0,promo:32.5,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'GUJARATGAS',n:'Gujarat Gas Ltd',sec:'Energy',p:548.40,ch:4.80,cp:0.88,u:1,lo:540.4,hi:556.8,w52l:402.5,w52h:688.15,mc:'₹37,842Cr',pe:28.4,pb:6.8,dy:0.4,beta:0.84,roe:24.4,de:0,promo:66.5,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'ADANIPOWER',n:'Adani Power Ltd',sec:'Power',p:548.40,ch:-8.40,cp:-1.51,u:0,lo:538.4,hi:560.4,w52l:289.75,w52h:871.4,mc:'₹2.12L Cr',pe:12.4,pb:3.8,dy:0,beta:1.48,roe:30.8,de:2.4,promo:74.9,pledge:14.2,sig:'SELL',sc:'sell',cf:52},
{s:'TATAPOWER',n:'Tata Power Company Ltd',sec:'Power',p:412.40,ch:3.60,cp:0.88,u:1,lo:406.4,hi:418.8,w52l:311.5,w52h:494.85,mc:'₹1.31L Cr',pe:28.4,pb:3.8,dy:0.6,beta:1.24,roe:13.4,de:1.8,promo:46.9,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'ADANIGREEN',n:'Adani Green Energy Ltd',sec:'Power',p:1548.40,ch:-28.40,cp:-1.80,u:0,lo:1520.4,hi:1580.8,w52l:864.8,w52h:2174.45,mc:'₹2.44L Cr',pe:184.2,pb:18.4,dy:0,beta:1.62,roe:9.8,de:8.4,promo:56.9,pledge:22.4,sig:'SELL',sc:'sell',cf:45},
{s:'SJVN',n:'SJVN Ltd',sec:'Power',p:112.40,ch:0.80,cp:0.72,u:1,lo:110.6,hi:114.2,w52l:72.35,w52h:170.35,mc:'₹44,242Cr',pe:28.4,pb:2.8,dy:2.4,beta:1.04,roe:9.4,de:0.8,promo:58.1,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'NHPC',n:'NHPC Ltd',sec:'Power',p:84.40,ch:0.60,cp:0.72,u:1,lo:83.0,hi:85.8,w52l:62.0,w52h:118.45,mc:'₹84,742Cr',pe:22.4,pb:1.8,dy:3.2,beta:0.98,roe:8.4,de:1.4,promo:67.4,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'TORNTPOWER',n:'Torrent Power Ltd',sec:'Power',p:1748.60,ch:14.40,cp:0.83,u:1,lo:1728.4,hi:1764.8,w52l:1114.5,w52h:2040.45,mc:'₹83,742Cr',pe:28.4,pb:4.8,dy:1.2,beta:0.88,roe:17.4,de:0.8,promo:52.6,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'CESC',n:'CESC Ltd',sec:'Power',p:148.40,ch:1.20,cp:0.81,u:1,lo:146.2,hi:150.6,w52l:105.05,w52h:194.8,mc:'₹19,742Cr',pe:14.4,pb:1.6,dy:2.4,beta:0.96,roe:11.4,de:1.4,promo:52.1,pledge:0,sig:'HOLD',sc:'hold',cf:58},
/* ── METALS & MINING ── */
{s:'NMDC',n:'NMDC Ltd',sec:'Mining',p:68.40,ch:0.60,cp:0.88,u:1,lo:67.2,hi:69.6,w52l:53.5,w52h:102.8,mc:'₹59,742Cr',pe:8.4,pb:1.6,dy:5.8,beta:1.14,roe:18.4,de:0,promo:60.8,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'SAIL',n:'Steel Authority of India',sec:'Metals',p:128.40,ch:1.20,cp:0.94,u:1,lo:126.4,hi:130.6,w52l:103.2,w52h:175.35,mc:'₹53,142Cr',pe:18.4,pb:0.8,dy:2.2,beta:1.38,roe:4.4,de:1.2,promo:65.0,pledge:0,sig:'HOLD',sc:'hold',cf:52},
{s:'HINDZINC',n:'Hindustan Zinc Ltd',sec:'Metals',p:484.40,ch:4.40,cp:0.92,u:1,lo:478.4,hi:490.8,w52l:285.25,w52h:807.85,mc:'₹2.04L Cr',pe:14.4,pb:5.4,dy:6.2,beta:1.08,roe:36.8,de:0,promo:64.9,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'NATIONALUM',n:'National Aluminium Co.',sec:'Metals',p:212.40,ch:2.40,cp:1.14,u:1,lo:208.8,hi:215.4,w52l:144.85,w52h:262.05,mc:'₹39,342Cr',pe:18.4,pb:2.8,dy:4.8,beta:1.28,roe:15.8,de:0,promo:51.3,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'RATNAMANI',n:'Ratnamani Metals & Tubes',sec:'Metals',p:3248.40,ch:28.40,cp:0.88,u:1,lo:3208.4,hi:3282.8,w52l:2401.0,w52h:4117.9,mc:'₹15,542Cr',pe:28.4,pb:5.4,dy:0.6,beta:0.86,roe:22.4,de:0,promo:53.0,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'APLAPOLLO',n:'APL Apollo Tubes Ltd',sec:'Metals',p:1548.40,ch:14.40,cp:0.94,u:1,lo:1530.4,hi:1566.8,w52l:1148.35,w52h:1873.4,mc:'₹43,242Cr',pe:58.4,pb:12.4,dy:0.4,beta:1.02,roe:21.4,de:0.4,promo:34.7,pledge:0,sig:'BUY',sc:'buy',cf:69},
/* ── CEMENT ── */
{s:'AMBUJACEMENT',n:'Ambuja Cements Ltd',sec:'Cement',p:548.40,ch:4.40,cp:0.81,u:1,lo:542.4,hi:554.8,w52l:435.75,w52h:706.3,mc:'₹1.09L Cr',pe:38.4,pb:3.8,dy:0.4,beta:0.88,roe:9.8,de:0,promo:70.1,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'ACCLTD',n:'ACC Ltd',sec:'Cement',p:2012.40,ch:14.40,cp:0.72,u:1,lo:1990.4,hi:2030.6,w52l:1744.0,w52h:2844.35,mc:'₹37,842Cr',pe:28.4,pb:3.2,dy:0.8,beta:0.92,roe:11.4,de:0,promo:50.1,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'SHREECEM',n:'Shree Cement Ltd',sec:'Cement',p:25412.60,ch:184.40,cp:0.73,u:1,lo:25156.4,hi:25592.8,w52l:20800.0,w52h:31084.45,mc:'₹91,542Cr',pe:48.4,pb:6.8,dy:0.2,beta:0.82,roe:13.8,de:0,promo:67.1,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'RAMCOCEM',n:'The Ramco Cements Ltd',sec:'Cement',p:912.40,ch:6.80,cp:0.75,u:1,lo:900.4,hi:922.8,w52l:701.75,w52h:1129.5,mc:'₹21,542Cr',pe:38.4,pb:3.8,dy:0.4,beta:0.88,roe:9.8,de:0.6,promo:42.3,pledge:0,sig:'HOLD',sc:'hold',cf:58},
/* ── CHEMICALS ── */
{s:'SRF',n:'SRF Ltd',sec:'Chemicals',p:2648.40,ch:22.40,cp:0.85,u:1,lo:2618.4,hi:2676.8,w52l:1860.5,w52h:2893.85,mc:'₹78,542Cr',pe:42.4,pb:6.8,dy:0.4,beta:0.94,roe:16.4,de:0.8,promo:50.5,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'AARTI',n:'Aarti Industries Ltd',sec:'Chemicals',p:548.40,ch:4.80,cp:0.88,u:1,lo:540.4,hi:556.8,w52l:418.65,w52h:761.45,mc:'₹19,842Cr',pe:38.4,pb:4.8,dy:0.6,beta:0.96,roe:12.4,de:0.6,promo:43.8,pledge:0,sig:'HOLD',sc:'hold',cf:59},
{s:'DEEPAKNTR',n:'Deepak Nitrite Ltd',sec:'Chemicals',p:2448.40,ch:18.40,cp:0.76,u:1,lo:2422.4,hi:2472.8,w52l:1801.25,w52h:2906.7,mc:'₹33,442Cr',pe:38.4,pb:6.4,dy:0.4,beta:1.02,roe:16.4,de:0.2,promo:49.4,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'NAVINFLUOR',n:'Navin Fluorine International',sec:'Chemicals',p:3812.40,ch:28.40,cp:0.75,u:1,lo:3778.4,hi:3848.8,w52l:2876.35,w52h:4481.5,mc:'₹18,942Cr',pe:42.4,pb:6.4,dy:0.4,beta:0.88,roe:15.4,de:0.2,promo:28.4,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'CLEAN',n:'Clean Science & Technology',sec:'Chemicals',p:1348.40,ch:10.40,cp:0.78,u:1,lo:1334.2,hi:1362.8,w52l:1021.5,w52h:1766.05,mc:'₹14,342Cr',pe:48.4,pb:8.4,dy:0.2,beta:0.74,roe:18.4,de:0,promo:71.3,pledge:0,sig:'HOLD',sc:'hold',cf:62},
/* ── INFRA, REAL ESTATE, CONSTRUCTION ── */
{s:'DLF',n:'DLF Ltd',sec:'Real Estate',p:848.40,ch:6.80,cp:0.81,u:1,lo:838.4,hi:858.6,w52l:661.25,w52h:967.85,mc:'₹2.10L Cr',pe:52.4,pb:4.4,dy:0.8,beta:1.24,roe:8.4,de:0.2,promo:74.9,pledge:0,sig:'HOLD',sc:'hold',cf:61},
{s:'GODREJPROP',n:'Godrej Properties Ltd',sec:'Real Estate',p:2812.40,ch:22.40,cp:0.80,u:1,lo:2784.4,hi:2842.8,w52l:1725.4,w52h:3403.6,mc:'₹78,142Cr',pe:148.4,pb:6.8,dy:0,beta:1.34,roe:4.6,de:0.8,promo:58.5,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'OBEROIRLTY',n:'Oberoi Realty Ltd',sec:'Real Estate',p:1948.40,ch:18.40,cp:0.95,u:1,lo:1924.4,hi:1972.8,w52l:1170.2,w52h:2186.35,mc:'₹70,842Cr',pe:28.4,pb:4.8,dy:0.4,beta:1.12,roe:18.4,de:0.2,promo:67.7,pledge:0,sig:'BUY',sc:'buy',cf:69},
{s:'PHOENIXLTD',n:'The Phoenix Mills Ltd',sec:'Real Estate',p:1748.40,ch:14.40,cp:0.83,u:1,lo:1728.6,hi:1768.4,w52l:1113.0,w52h:2068.3,mc:'₹62,542Cr',pe:42.4,pb:6.4,dy:0.2,beta:1.08,roe:14.8,de:0.8,promo:47.3,pledge:0,sig:'BUY',sc:'buy',cf:67},
{s:'PRESTIGE',n:'Prestige Estates Projects',sec:'Real Estate',p:1548.40,ch:12.40,cp:0.81,u:1,lo:1530.4,hi:1566.8,w52l:1004.25,w52h:1990.2,mc:'₹62,142Cr',pe:62.4,pb:8.4,dy:0.2,beta:1.18,roe:13.4,de:1.8,promo:67.7,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'LICI',n:'Life Insurance Corp.',sec:'Insurance',p:948.40,ch:6.80,cp:0.72,u:1,lo:936.4,hi:960.8,w52l:744.85,w52h:1222.0,mc:'₹5.99L Cr',pe:14.4,pb:1.2,dy:0.8,beta:0.72,roe:8.4,de:0,promo:96.5,pledge:0,sig:'HOLD',sc:'hold',cf:60},
{s:'IRFC',n:'Indian Railway Finance Corp.',sec:'NBFC',p:148.40,ch:1.20,cp:0.81,u:1,lo:146.2,hi:150.6,w52l:87.55,w52h:229.0,mc:'₹1.94L Cr',pe:28.4,pb:3.4,dy:1.4,beta:0.96,roe:12.4,de:9.8,promo:86.4,pledge:0,sig:'HOLD',sc:'hold',cf:58},
/* ── CONSUMER ELECTRONICS ── */
{s:'DIXON',n:'Dixon Technologies Ltd',sec:'Electronics',p:15240.80,ch:312.40,cp:2.09,u:1,lo:14892.4,hi:15348.6,w52l:6427.15,w52h:18918.9,mc:'₹91,442Cr',pe:108.4,pb:24.8,dy:0.1,beta:1.42,roe:24.8,de:0.4,promo:34.7,pledge:0,sig:'BUY',sc:'buy',cf:72},
{s:'AMBER',n:'Amber Enterprises India',sec:'Electronics',p:6412.80,ch:48.40,cp:0.76,u:1,lo:6352.4,hi:6468.8,w52l:2916.7,w52h:7786.05,mc:'₹21,142Cr',pe:68.4,pb:8.4,dy:0.2,beta:1.18,roe:12.4,de:0.4,promo:39.6,pledge:0,sig:'BUY',sc:'buy',cf:67},
/* ── DEFENCE ── */
{s:'COCHINSHIP',n:'Cochin Shipyard Ltd',sec:'Defence',p:1648.40,ch:14.40,cp:0.88,u:1,lo:1628.4,hi:1668.8,w52l:560.55,w52h:2974.5,mc:'₹43,442Cr',pe:42.4,pb:8.4,dy:1.2,beta:1.28,roe:18.4,de:0,promo:72.9,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'MAZAGON',n:'Mazagon Dock Shipbuilders',sec:'Defence',p:4248.40,ch:38.40,cp:0.91,u:1,lo:4198.4,hi:4288.8,w52l:1732.5,w52h:5296.45,mc:'₹85,642Cr',pe:28.4,pb:14.4,dy:0.8,beta:1.32,roe:50.4,de:0,promo:84.8,pledge:0,sig:'HOLD',sc:'hold',cf:63},
{s:'GRSE',n:'Garden Reach Shipbuilders',sec:'Defence',p:1748.40,ch:14.40,cp:0.83,u:1,lo:1728.4,hi:1772.8,w52l:660.2,w52h:2635.05,mc:'₹20,042Cr',pe:38.4,pb:8.4,dy:0.6,beta:1.38,roe:22.4,de:0,promo:74.5,pledge:0,sig:'HOLD',sc:'hold',cf:60},
/* ── RENEWABLE ENERGY ── */
{s:'WAAREE',n:'Waaree Energies Ltd',sec:'Renewable',p:2748.40,ch:28.40,cp:1.04,u:1,lo:2712.4,hi:2782.8,w52l:1242.0,w52h:3783.0,mc:'₹79,542Cr',pe:42.4,pb:8.4,dy:0,beta:1.52,roe:18.4,de:0.4,promo:68.5,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'SUZLON',n:'Suzlon Energy Ltd',sec:'Renewable',p:48.40,ch:0.60,cp:1.25,u:1,lo:47.4,hi:49.2,w52l:23.7,w52h:86.04,mc:'₹65,642Cr',pe:62.4,pb:18.4,dy:0,beta:1.68,roe:30.4,de:0.2,promo:13.3,pledge:0,sig:'HOLD',sc:'hold',cf:55},
/* ── FINTECH & NEW AGE ── */
{s:'ANGELONE',n:'Angel One Ltd',sec:'Fintech',p:2648.40,ch:28.40,cp:1.08,u:1,lo:2612.4,hi:2682.8,w52l:1965.5,w52h:3498.15,mc:'₹23,742Cr',pe:18.4,pb:6.4,dy:1.4,beta:1.38,roe:34.8,de:0,promo:38.3,pledge:0,sig:'BUY',sc:'buy',cf:72},
{s:'POLICYBZR',n:'PB Fintech Ltd (PolicyBazaar)',sec:'Fintech',p:1648.40,ch:14.40,cp:0.88,u:1,lo:1628.4,hi:1668.8,w52l:612.05,w52h:2062.55,mc:'₹75,142Cr',pe:0,pb:14.8,dy:0,beta:1.52,roe:-4.2,de:0,promo:5.3,pledge:0,sig:'HOLD',sc:'hold',cf:50},
/* ── OIL & GAS ── */
{s:'CASTROLIND',n:'Castrol India Ltd',sec:'Energy',p:212.40,ch:1.80,cp:0.85,u:1,lo:209.4,hi:215.4,w52l:133.35,w52h:284.35,mc:'₹21,342Cr',pe:22.4,pb:9.8,dy:5.4,beta:0.72,roe:44.4,de:0,promo:51.0,pledge:0,sig:'BUY',sc:'buy',cf:66},
{s:'GULFOILLUB',n:'Gulf Oil Lubricants India',sec:'Energy',p:1248.40,ch:10.40,cp:0.84,u:1,lo:1232.4,hi:1264.8,w52l:978.1,w52h:1698.9,mc:'₹6,242Cr',pe:22.4,pb:6.4,dy:2.4,beta:0.84,roe:28.4,de:0,promo:68.6,pledge:0,sig:'BUY',sc:'buy',cf:66},
/* ── ELECTRONICS MANUFACTURING ── */
{s:'KAYNES',n:'Kaynes Technology India Ltd',sec:'Electronics',p:4248.40,ch:42.40,cp:1.01,u:1,lo:4198.4,hi:4294.8,w52l:2020.95,w52h:5696.0,mc:'₹22,742Cr',pe:84.2,pb:14.4,dy:0,beta:1.28,roe:17.4,de:0.4,promo:55.1,pledge:0,sig:'BUY',sc:'buy',cf:68},
{s:'SYRMA',n:'Syrma SGS Technology Ltd',sec:'Electronics',p:548.40,ch:5.60,cp:1.03,u:1,lo:540.4,hi:556.8,w52l:348.05,w52h:732.45,mc:'₹6,042Cr',pe:48.4,pb:5.8,dy:0,beta:1.28,roe:12.4,de:0.4,promo:64.1,pledge:0,sig:'BUY',sc:'buy',cf:63},
{s:'IDEAFORGE',n:'ideaForge Technology Ltd',sec:'Defence',p:448.40,ch:4.80,cp:1.08,u:1,lo:440.4,hi:457.2,w52l:346.1,w52h:1045.0,mc:'₹1,642Cr',pe:0,pb:4.8,dy:0,beta:1.48,roe:-8.4,de:0,promo:46.9,pledge:0,sig:'WATCH',sc:'watch',cf:40},
/* ── FASHION & APPAREL ── */
{s:'VEDANT',n:'Vedant Fashions Ltd (Manyavar)',sec:'Consumer',p:948.40,ch:8.40,cp:0.89,u:1,lo:936.4,hi:960.8,w52l:780.0,w52h:1497.7,mc:'₹24,742Cr',pe:38.4,pb:14.4,dy:0.8,beta:0.88,roe:38.4,de:0,promo:74.9,pledge:0,sig:'BUY',sc:'buy',cf:69},
{s:'TRENT',n:'Trent Ltd',sec:'Retail',p:5812.60,ch:48.40,cp:0.84,u:1,lo:5748.4,hi:5872.8,w52l:3047.55,w52h:8346.65,mc:'₹2.07L Cr',pe:148.4,pb:28.4,dy:0.1,beta:1.04,roe:18.8,de:0,promo:37.1,pledge:0,sig:'HOLD',sc:'hold',cf:58},
{s:'RUPA',n:'Rupa & Company Ltd',sec:'Consumer',p:312.40,ch:2.80,cp:0.90,u:1,lo:308.4,hi:316.8,w52l:208.45,w52h:434.5,mc:'₹2,542Cr',pe:18.4,pb:3.4,dy:1.4,beta:0.84,roe:18.4,de:0,promo:75.0,pledge:0,sig:'HOLD',sc:'hold',cf:58},
/* ── AGRICULTURE INPUTS ── */
{s:'BAYER',n:'Bayer CropScience Ltd',sec:'Agri',p:5648.40,ch:44.40,cp:0.79,u:1,lo:5586.4,hi:5706.8,w52l:3942.5,w52h:7142.0,mc:'₹24,042Cr',pe:38.4,pb:7.8,dy:0.8,beta:0.74,roe:20.4,de:0,promo:67.5,pledge:0,sig:'HOLD',sc:'hold',cf:62},
{s:'RALLIS',n:'Rallis India Ltd',sec:'Agri',p:284.40,ch:2.40,cp:0.85,u:1,lo:280.4,hi:288.8,w52l:205.5,w52h:359.2,mc:'₹5,542Cr',pe:28.4,pb:3.8,dy:1.2,beta:0.86,roe:13.4,de:0,promo:50.1,pledge:0,sig:'HOLD',sc:'hold',cf:57},
/* ── DEFENSE ADDITIONAL ── */
{s:'DATAPATTE',n:'Data Patterns (India) Ltd',sec:'Defence',p:2248.40,ch:22.40,cp:1.01,u:1,lo:2220.4,hi:2276.8,w52l:1540.15,w52h:3198.5,mc:'₹6,042Cr',pe:68.4,pb:14.4,dy:0.2,beta:1.18,roe:22.4,de:0,promo:44.5,pledge:0,sig:'BUY',sc:'buy',cf:68},
/* ── METALS ADDITIONAL ── */
{s:'WELCORP',n:'Welspun Corp Ltd',sec:'Metals',p:712.40,ch:6.80,cp:0.96,u:1,lo:702.4,hi:722.8,w52l:500.05,w52h:912.35,mc:'₹18,642Cr',pe:18.4,pb:2.4,dy:0.6,beta:1.12,roe:14.4,de:0.6,promo:53.6,pledge:0,sig:'BUY',sc:'buy',cf:64},
{s:'JAIBALAJI',n:'Jai Balaji Industries Ltd',sec:'Metals',p:1148.40,ch:10.40,cp:0.91,u:1,lo:1132.4,hi:1162.8,w52l:432.35,w52h:1544.1,mc:'₹9,742Cr',pe:18.4,pb:3.4,dy:0,beta:1.38,roe:18.4,de:1.2,promo:74.9,pledge:0,sig:'BUY',sc:'buy',cf:62},
{s:'GALLANTT',n:'Gallantt Ispat Ltd',sec:'Metals',p:248.40,ch:2.40,cp:0.97,u:1,lo:244.4,hi:252.8,w52l:143.0,w52h:398.7,mc:'₹3,342Cr',pe:14.4,pb:2.4,dy:0.4,beta:1.24,roe:18.4,de:0.4,promo:74.9,pledge:0,sig:'BUY',sc:'buy',cf:62},
/* ── WATER & ENVIRONMENT ── */
{s:'VA_TECH',n:'VA Tech Wabag Ltd',sec:'Capital Goods',p:1148.40,ch:10.40,cp:0.92,u:1,lo:1132.4,hi:1164.8,w52l:650.35,w52h:1548.6,mc:'₹7,942Cr',pe:28.4,pb:4.4,dy:0.4,beta:1.08,roe:14.4,de:0,promo:29.0,pledge:0,sig:'BUY',sc:'buy',cf:64},
{s:'ION',n:'Ion Exchange (India) Ltd',sec:'Capital Goods',p:2648.40,ch:22.40,cp:0.85,u:1,lo:2618.4,hi:2676.8,w52l:1748.0,w52h:3642.0,mc:'₹3,842Cr',pe:28.4,pb:6.8,dy:0.4,beta:0.94,roe:22.4,de:0,promo:36.5,pledge:0,sig:'BUY',sc:'buy',cf:65},
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

export const SECTORS = ['IT','Banking','Auto','Pharma','Energy','FMCG','Chemicals','Infra','Power','NBFC','Consumer','Defence','Real Estate','Metals','Mining','Electronics','Renewable','Fintech','Others'];

export function formatINR(v: number): string {
  return v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatINRShort(v: number): string {
  return v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
