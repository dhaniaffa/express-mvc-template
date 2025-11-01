import { Router } from 'express';

import userRoutes from './user.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});

router.use('/users', userRoutes);

export default router;
