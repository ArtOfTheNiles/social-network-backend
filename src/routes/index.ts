import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

router.use((_req, res) => {
  return res.send(404 + 'No Route Found, Please check the URL and try again!');
});

export default router;
