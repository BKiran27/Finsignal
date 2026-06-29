import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL || ''],
  credentials: true,
}));
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Anthropic
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      supabase: supabaseUrl ? 'connected' : 'missing-credentials',
      anthropic: process.env.ANTHROPIC_API_KEY ? 'connected' : 'missing-credentials',
    }
  });
});

// AI Analysis Routes
app.post('/api/ai/investment-analysis', async (req: Request, res: Response) => {
  try {
    const { ticker, analysisType, context } = req.body;

    if (!ticker || !analysisType) {
      return res.status(400).json({ error: 'ticker and analysisType required' });
    }

    const analysisPrompts: Record<string, string> = {
      'full-stock-analysis': `Provide a comprehensive investment analysis for ${ticker}. Include valuation, financial health, competitive position, risks, and investment recommendation. Format in clear sections.`,
      'financial-health': `Analyze the financial health of ${ticker}. Review key metrics, balance sheet strength, cash flow, financial ratios, and debt levels. Be specific and data-driven.`,
      'moat-analysis': `Analyze the competitive moat of ${ticker}. Identify sustainable competitive advantages, brand strength, switching costs, and business defensibility.`,
      'valuation-analysis': `Perform detailed valuation analysis of ${ticker}. Include P/E ratio, P/B ratio, DCF considerations, and whether it appears over/undervalued.`,
      'risk-scanner': `Identify and analyze key risks for ${ticker}. Include market risk, operational risk, financial risk, regulatory risk, and management risk.`,
      'earnings-quality': `Assess earnings quality of ${ticker}. Review revenue recognition, accruals quality, sustainability of profits, and management credibility.`,
      'management-quality': `Evaluate management quality at ${ticker}. Assess track record, incentive alignment, capital allocation decisions, and shareholder communication.`,
      'industry-analysis': `Analyze the industry and sector for ${ticker}. Include growth drivers, competitive dynamics, industry trends, and structural attractiveness.`,
      'portfolio-construction': `Provide portfolio construction advice considering ${ticker}. Include optimal allocation, diversification benefits, and risk management approach.`,
    };

    const prompt = analysisPrompts[analysisType] || analysisPrompts['full-stock-analysis'];

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `${prompt}${context ? `\n\nAdditional context: ${context}` : ''}`,
        },
      ],
    });

    const textContent = message.content.find((block: any) => block.type === 'text');
    const analysisText = textContent && 'text' in textContent ? (textContent as any).text : '';

    res.json({
      ticker,
      analysisType,
      analysis: analysisText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to generate analysis', details: String(error) });
  }
});

app.post('/api/ai/budget-analysis', async (req: Request, res: Response) => {
  try {
    const { income, expenses, goals } = req.body;

    if (!income || !expenses) {
      return res.status(400).json({ error: 'income and expenses required' });
    }

    const totalExpenses = Object.values(expenses as any).reduce((sum: number, val: any) => sum + (Number(val) || 0), 0) as number;
    const incomeNum = Number(income) || 0;
    const savingsRate = (((incomeNum - totalExpenses) / (incomeNum || 1)) * 100).toFixed(2);

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Analyze this personal budget and provide 5 specific, actionable recommendations:
Income: ₹${income}
Expenses: ${JSON.stringify(expenses, null, 2)}
Savings Rate: ${savingsRate}%
${goals ? `Financial Goals: ${goals}` : ''}

Format your response as numbered recommendations with specific actions.`,
        },
      ],
    });

    const textContent = message.content.find((block: any) => block.type === 'text');
    const analysisText = textContent && 'text' in textContent ? (textContent as any).text : '';

    res.json({
      budget: {
        income,
        expenses,
        totalExpenses,
        savingsRate,
      },
      recommendations: analysisText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Budget analysis error:', error);
    res.status(500).json({ error: 'Failed to generate budget analysis', details: String(error) });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ FinSignal Backend running on http://localhost:${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
});