import { Request, Response } from 'express';
import { MLProxyService } from '../services/mlProxy.service';

export class MarketController {
  static async getSurveillance(req: Request, res: Response) {
    try {
      const result = await MLProxyService.getSurveillance();
      res.json(result);
    } catch (error: any) {
      console.error('Surveillance error:', error);
      res.status(500).json({ error: 'Failed to fetch surveillance data', details: error.message });
    }
  }

  static async getDebate(req: Request, res: Response) {
    try {
      const ticker = req.params.ticker as string;
      const result = await MLProxyService.getDebate(ticker);
      res.json(result);
    } catch (error: any) {
      console.error('Debate proxy error:', error);
      res.status(500).json({ error: 'Failed to fetch agent debate data', details: error.message });
    }
  }

  static async getQuote(req: Request, res: Response) {
    try {
      const ticker = req.params.ticker as string;
      const result = await MLProxyService.getQuote(ticker);
      res.json(result);
    } catch (error: any) {
      console.error('Quote proxy error:', error);
      res.status(500).json({ error: 'Failed to fetch stock quote', details: error.message });
    }
  }
}
