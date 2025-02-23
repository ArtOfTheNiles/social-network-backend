import { Router } from 'express';
const router = Router();
import reactionRoutes from './reactionRoutes';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

export default router;
