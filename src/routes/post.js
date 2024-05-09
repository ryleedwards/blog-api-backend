import { Router } from 'express';
import * as postController from '../controllers/postController.js';
import passport from 'passport';

const router = Router();

// Get all posts
router.get('/', postController.getPosts);

// Get specific post by ID
router.get('/:postId', postController.getPost);

// Create post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.createPost
);

// Update post
router.put(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.updatePost
);

// Delete post
router.delete(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.deletePost
);

export default router;
