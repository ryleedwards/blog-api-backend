import { Router } from 'express';
import * as commentController from '../controllers/commentController.js';
import passport from 'passport';

const router = Router();

// Get all comments

router.get('/', commentController.getComments);

// Get specific comment by ID

router.get('/:commentId', commentController.getComment);

// Create comment

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  commentController.createComment
);

// Update comment

router.put(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.updateComment
);

// Delete comment

router.delete(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.deleteComment
);

export default router;
