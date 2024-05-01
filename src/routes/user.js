import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

// Get all users
router.get('/', userController.getUsers);

// Get specific user
router.get('/:userId', userController.getUser);

// Create user
router.post('/', userController.createUser);

export default router;
