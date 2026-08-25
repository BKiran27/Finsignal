import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

export function initializeWebSocket(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // For dev
      methods: ['GET', 'POST']
    }
  });

  const subscriptions: Record<string, NodeJS.Timeout> = {};

  io.on('connection', (socket) => {
    console.log(`WebSocket client connected: ${socket.id}`);

    socket.on('subscribe', (ticker: string) => {
      console.log(`Client ${socket.id} subscribed to ${ticker}`);
      socket.join(ticker);

      // Start a tick generator if not already started for this ticker
      if (!subscriptions[ticker]) {
        let lastPrice = 100 + Math.random() * 1000; // Mock base price
        
        subscriptions[ticker] = setInterval(() => {
          // Generate a random price movement
          const change = (Math.random() - 0.5) * 0.005; // 0.5% max move
          lastPrice = lastPrice * (1 + change);
          
          const tick = {
            time: Math.floor(Date.now() / 1000),
            price: lastPrice,
            ticker
          };
          
          io.to(ticker).emit('tick', tick);
        }, 1000); // Emits every second
      }
    });

    socket.on('unsubscribe', (ticker: string) => {
      console.log(`Client ${socket.id} unsubscribed from ${ticker}`);
      socket.leave(ticker);
      
      // Cleanup if empty could go here, omitting for simplicity
    });

    socket.on('disconnect', () => {
      console.log(`WebSocket client disconnected: ${socket.id}`);
    });
  });

  return io;
}
