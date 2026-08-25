import { Request, Response } from 'express';
import { MarketDataService } from '../services/marketData.service';

export class ChartController {
  static async getHistory(req: Request, res: Response) {
    try {
      const ticker = req.params.ticker as string;
      const interval = (req.query.interval || '1d') as string;
      const range = (req.query.range || '6mo') as string;

      if (!ticker) {
        return res.status(400).json({ error: 'Ticker is required' });
      }

      const data = await MarketDataService.getOHLCV(ticker, interval, range);
      res.json(data);
    } catch (error: any) {
      console.error('Chart history error:', error);
      res.status(500).json({ error: 'Failed to fetch historical data', details: error.message });
    }
  }
}
