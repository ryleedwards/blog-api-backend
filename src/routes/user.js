import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import passport from 'passport';

const router = Router();

// Get all users
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUsers
);

// Get specific user
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

// Create user
router.post('/', userController.createUser);

// Update user
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

// Delete user
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

export default router;
