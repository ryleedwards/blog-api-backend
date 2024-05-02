import { Router } from 'express';
import * as postController from '../controllers/postController.js';

const router = Router();

// Get all posts
router.get('/', postController.getPosts);

// Get specific post by ID
router.get('/:postId', postController.getPost);

// Create post
router.post('/', postController.createPost);

// Update post
router.put('/:postId', postController.updatePost);

// Delete post
router.delete('/:postId', postController.deletePost);
