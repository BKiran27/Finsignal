import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL || ''],
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api', routes);

// Serve React production static bundle
const distPath = fs.existsSync(path.join(__dirname, '../../dist'))
  ? path.join(__dirname, '../../dist')
  : path.join(__dirname, '../dist');

app.use(express.static(distPath));

// Wildcard client router - Fallback to index.html for client-side routing
app.get('/*splat', (req: Request, res: Response) => {
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

import http from 'http';
import { initializeWebSocket } from './websocket';

const server = http.createServer(app);
initializeWebSocket(server);

server.listen(PORT, () => {
  console.log(`✅ FinSignal Backend running on http://localhost:${PORT}`);
  console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔌 WebSocket server active`);
});