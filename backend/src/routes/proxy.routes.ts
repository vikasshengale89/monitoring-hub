import { Router } from 'express';
import { executeProxy, getHistory, getStats } from '../controllers/proxy.controller';

const router = Router();

router.post('/proxy', executeProxy);
router.get('/history', getHistory);
router.get('/stats', getStats);

export default router;
