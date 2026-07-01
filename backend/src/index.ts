import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

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

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  let mlStatus = 'offline';
  try {
    const mlRes = await fetch('http://127.0.0.1:5001/api/ml/health');
    if (mlRes.ok) mlStatus = 'connected';
  } catch (e) {}

  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      supabase: supabaseUrl ? 'connected' : 'missing-credentials',
      ml_service: mlStatus
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

    const response = await fetch('http://127.0.0.1:5001/api/ml/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker, analysisType, context })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'ML service error', details: errText });
    }

    const result = await response.json() as any;

    res.json({
      ticker,
      analysisType,
      analysis: result.analysis,
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

    const response = await fetch('http://127.0.0.1:5001/api/ml/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ income, expenses, goals })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'ML service budget error', details: errText });
    }

    const result = await response.json() as any;

    res.json({
      budget: result.budget,
      recommendations: result.recommendations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Budget analysis error:', error);
    res.status(500).json({ error: 'Failed to generate budget analysis', details: String(error) });
  }
});

app.get('/api/market-surveillance', async (req: Request, res: Response) => {
  try {
    const response = await fetch('http://127.0.0.1:5001/api/ml/surveillance');
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'ML surveillance error', details: errText });
    }
    const result = await response.json() as any;
    res.json(result);
  } catch (error) {
    console.error('Surveillance proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch surveillance data', details: String(error) });
  }
});

app.get('/api/agent-debate/:ticker', async (req: Request, res: Response) => {
  try {
    const { ticker } = req.params;
    const response = await fetch(`http://127.0.0.1:5001/api/ml/debate/${ticker}`);
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'ML debate error', details: errText });
    }
    const result = await response.json() as any;
    res.json(result);
  } catch (error) {
    console.error('Debate proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch agent debate data', details: String(error) });
  }
});

app.get('/api/stock-quote/:ticker', async (req: Request, res: Response) => {
  try {
    const { ticker } = req.params;
    const response = await fetch(`http://127.0.0.1:5001/api/ml/quote/${ticker}`);
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'ML quote error', details: errText });
    }
    const result = await response.json() as any;
    res.json(result);
  } catch (error) {
    console.error('Quote proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch stock quote', details: String(error) });
  }
});

// Serve React production static bundle
const distPath = fs.existsSync(path.join(__dirname, '../../dist'))
  ? path.join(__dirname, '../../dist')
  : path.join(__dirname, '../dist');

app.use(express.static(distPath));

// Wildcard client router - Fallback to index.html for client-side routing
app.get('*', (req: Request, res: Response) => {
  // If it's an API route that fell through, don't serve HTML
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  const indexFile = path.join(distPath, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(404).send('React production bundle not found. Run npm run build.');
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

app.listen(PORT, () => {
  console.log(`✅ FinSignal Backend running on http://localhost:${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
});