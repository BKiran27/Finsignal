import { Router } from 'express';
import { ChartController } from '../controllers/chart.controller';

const router = Router();

router.get('/history/:ticker', ChartController.getHistory);

export default router;
