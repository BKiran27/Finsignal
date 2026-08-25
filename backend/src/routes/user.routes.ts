import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all routes in this router
router.use(requireAuth);

router.get('/profile', (req, res) => {
  // @ts-ignore
  res.json({ user: req.user });
});

export default router;
