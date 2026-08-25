import { Router } from 'express';
import aiRoutes from './ai.routes';
import marketRoutes from './market.routes';
import userRoutes from './user.routes';
import chartRoutes from './chart.routes';
import { MLProxyService } from '../services/mlProxy.service';

const router = Router();

// Health check route
router.get('/health', async (req, res) => {
  let mlStatus = 'offline';
  try {
    const mlRes = await MLProxyService.checkHealth();
    if (mlRes.status === 'ok') mlStatus = 'connected';
  } catch (e) {}

  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      supabase: process.env.SUPABASE_URL ? 'connected' : 'missing-credentials',
      anthropic: process.env.ANTHROPIC_API_KEY ? 'connected' : 'missing-credentials',
      ml_service: mlStatus
    }
  });
});

router.use('/ai', aiRoutes);
router.use('/user', userRoutes);
router.use('/chart', chartRoutes);
router.use('/', marketRoutes); 

export default router;
