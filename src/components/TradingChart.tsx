import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '@/lib/api-client';

interface TradingChartProps {
  ticker: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ ticker }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 0,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10D98A', // fs-green
      downColor: '#FF4757', // fs-red
      borderVisible: false,
      wickUpColor: '#10D98A',
      wickDownColor: '#FF4757',
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    const loadDataAndConnect = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch historical data
        const res = await fetch(`${API_BASE_URL}/api/chart/history/${ticker}?interval=1d&range=1y`);
        if (!res.ok) {
          throw new Error('Failed to fetch historical data');
        }
        const data = await res.json();
        
        // Remove duplicates and sort by time just in case
        const uniqueData = data.filter((v: any, i: number, a: any[]) => a.findIndex(t => t.time === v.time) === i);
        uniqueData.sort((a: any, b: any) => a.time - b.time);
        
        candlestickSeries.setData(uniqueData);

        // Set last known price for the real-time simulation
        let lastCandle = uniqueData[uniqueData.length - 1];

        // 2. Connect to WebSocket
        const socketUrl = API_BASE_URL.replace('/api', ''); // Just base URL
        const socket = io(socketUrl);
        socketRef.current = socket;

        socket.on('connect', () => {
          socket.emit('subscribe', ticker);
        });

        socket.on('tick', (tick: any) => {
          if (tick.ticker === ticker && candlestickSeriesRef.current && lastCandle) {
            // Update the last candle
            const newPrice = tick.price;
            
            // If the tick is on a new day (mocking real-time intraday isn't fully set up in our python/yahoo fallback,
            // we will just update the current daily candle for simplicity)
            lastCandle = {
              ...lastCandle,
              close: newPrice,
              high: Math.max(lastCandle.high, newPrice),
              low: Math.min(lastCandle.low, newPrice),
            };
            
            candlestickSeriesRef.current.update(lastCandle);
          }
        });

      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDataAndConnect();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      if (socketRef.current) {
        socketRef.current.emit('unsubscribe', ticker);
        socketRef.current.disconnect();
      }
    };
  }, [ticker]);

  return (
    <div className="relative w-full h-[400px]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <div className="text-sm font-mono text-t2 animate-pulse">Loading Chart Data...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <div className="text-sm font-mono text-fs-red">{error}</div>
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};
