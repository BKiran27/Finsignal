export async function streamDeepResearch({
  messages,
  mode,
  onDelta,
  onDone,
  onError,
}: {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  mode: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    // Extract ticker or query from message
    const tickerMatch = lastMessage.match(/[A-Z]{1,5}\b/);
    const ticker = tickerMatch?.[0] || 'MARKET';
    const context = lastMessage;

    const response = await fetch('http://localhost:3001/api/ai/investment-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticker,
        analysisType: 'full-stock-analysis',
        context,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    onDelta(data.analysis);
    onDone();
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Stream error');
  }
}