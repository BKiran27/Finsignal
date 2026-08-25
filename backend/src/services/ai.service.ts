import { anthropic } from '../config/anthropic';
import { MLProxyService } from './mlProxy.service';

export class AIService {
  static async getInvestmentAnalysis(ticker: string, analysisType: string, context: string) {
    if (ticker === 'MARKET' || !analysisType || analysisType === 'macro-outlook') {
      // Use Anthropic for general market intelligence / macro outlook
      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        temperature: 0.7,
        system: "You are a top-tier financial analyst specializing in the Indian stock market and global macroeconomics. Provide concise, data-driven insights.",
        messages: [
          { role: 'user', content: context || `Provide a market analysis for ${ticker}` }
        ]
      });

      return {
        ticker,
        analysisType: analysisType || 'macro-outlook',
        analysis: response.content[0].type === 'text' ? response.content[0].text : 'No analysis returned',
        timestamp: new Date().toISOString(),
      };
    }

    // Default to the ML service for specific stock quantitative analysis
    const result = await MLProxyService.analyzeInvestment(ticker, analysisType, context);
    return {
      ticker,
      analysisType,
      analysis: result.analysis,
      timestamp: new Date().toISOString(),
    };
  }

  static async getBudgetAnalysis(income: number, expenses: any, goals: string) {
    return await MLProxyService.analyzeBudget(income, expenses, goals);
  }
}
