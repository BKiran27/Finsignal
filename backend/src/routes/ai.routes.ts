import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';

const router = Router();

router.post('/investment-analysis', AIController.getInvestmentAnalysis);
router.post('/budget-analysis', AIController.getBudgetAnalysis);

export default router;
