const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface AnalysisRequest {
  ticker: string;
  analysisType: string;
  context?: string;
}

interface BudgetAnalysisRequest {
  income: number;
  expenses: Record<string, number>;
  goals?: string;
}

export async function getInvestmentAnalysis(request: AnalysisRequest) {
  const response = await fetch(`${API_BASE_URL}/api/ai/investment-analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to get investment analysis');
  }

  return response.json();
}

export async function getBudgetAnalysis(request: BudgetAnalysisRequest) {
  const response = await fetch(`${API_BASE_URL}/api/ai/budget-analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to get budget analysis');
  }

  return response.json();
}

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}