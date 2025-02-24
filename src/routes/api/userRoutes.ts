import { Router } from 'express';
const router = Router();

import { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser 
} from '../../controllers/userController.js';

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

export default router;