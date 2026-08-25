import { Router } from 'express';
import { MarketController } from '../controllers/market.controller';

const router = Router();

router.get('/market-surveillance', MarketController.getSurveillance);
router.get('/agent-debate/:ticker', MarketController.getDebate);
router.get('/stock-quote/:ticker', MarketController.getQuote);

export default router;
