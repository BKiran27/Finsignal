import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';

export class AIController {
  static async getInvestmentAnalysis(req: Request, res: Response) {
    try {
      const { ticker, analysisType, context } = req.body;
      if (!ticker || !analysisType) {
        return res.status(400).json({ error: 'ticker and analysisType required' });
      }

      const result = await AIService.getInvestmentAnalysis(ticker, analysisType, context);
      res.json(result);
    } catch (error: any) {
      console.error('Analysis error:', error);
      res.status(500).json({ error: 'Failed to generate analysis', details: error.message });
    }
  }

  static async getBudgetAnalysis(req: Request, res: Response) {
    try {
      const { income, expenses, goals } = req.body;
      if (!income || !expenses) {
        return res.status(400).json({ error: 'income and expenses required' });
      }

      const result = await AIService.getBudgetAnalysis(income, expenses, goals);
      res.json(result);
    } catch (error: any) {
      console.error('Budget analysis error:', error);
      res.status(500).json({ error: 'Failed to generate budget analysis', details: error.message });
    }
  }
}
