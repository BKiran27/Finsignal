import yahooFinance from 'yahoo-finance2';

export class MarketDataService {
  static async getOHLCV(ticker: string, interval: string = '1d', range: string = '1mo') {
    // Append .NS for Indian stocks if not provided and not a global index like ^NSEI
    let symbol = ticker.toUpperCase();
    if (!symbol.includes('.') && !symbol.startsWith('^')) {
      symbol += '.NS';
    }

    try {
      const queryOptions = { period1: range, interval: interval as any };
      const result = (await yahooFinance.chart(symbol, queryOptions)) as any;
      
      if (!result.quotes || result.quotes.length === 0) {
        throw new Error('No historical data found');
      }

      // Format for lightweight-charts
      return result.quotes
        .filter(q => q.close !== null)
        .map(q => ({
          time: new Date(q.date).getTime() / 1000,
          open: q.open,
          high: q.high,
          low: q.low,
          close: q.close,
          volume: q.volume
        }));
    } catch (error) {
      console.error(`Error fetching OHLCV for ${symbol}:`, error);
      throw error;
    }
  }
}
