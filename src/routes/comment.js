import { Router } from 'express';
import * as commentController from '../controllers/commentController.js';

const router = Router();

// Get all comments

router.get('/', commentController.getComments);

// Get specific comment by ID

router.get('/:commentId', commentController.getComment);

// Create comment

router.post('/', commentController.createComment);

// Update comment

router.put('/:commentId', commentController.updateComment);

// Delete comment

router.delete('/:commentId', commentController.deleteComment);

export default router;
