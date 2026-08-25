const ML_BASE_URL = 'http://127.0.0.1:5001/api/ml';

export class MLProxyService {
  static async checkHealth() {
    const res = await fetch(`${ML_BASE_URL}/health`);
    if (!res.ok) throw new Error('ML service offline');
    return res.json();
  }

  static async analyzeInvestment(ticker: string, analysisType: string, context: string) {
    const res = await fetch(`${ML_BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker, analysisType, context })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  static async analyzeBudget(income: number, expenses: any, goals: string) {
    const res = await fetch(`${ML_BASE_URL}/budget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ income, expenses, goals })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  static async getSurveillance() {
    const res = await fetch(`${ML_BASE_URL}/surveillance`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  static async getDebate(ticker: string) {
    const res = await fetch(`${ML_BASE_URL}/debate/${ticker}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  static async getQuote(ticker: string) {
    const res = await fetch(`${ML_BASE_URL}/quote/${ticker}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}
