import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Post from '../models/post.js';
import CustomError from '../utils/CustomError.js';

// return all posts

export const getPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({ publishedAt: -1 }).exec();
  res.json(allPosts);
});

// return specific post by ID

export const getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId).exec();
  if (post === null) {
    next(new CustomError('Post not found', 404));
  }
  res.json(post);
});

// create post

export const createPost = [
  // Validate and sanitize fields
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Title must be specified'),
  body('author').trim().isMongoId().withMessage('Author must be specified'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('published must be boolean'),
  body('publishedAt')
    .optional()
    .isISO8601()
    .withMessage('publishedAt must be date'),
  body('comments').optional().isArray().withMessage('comments must be array'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new CustomError(errors.array()[0], 400));
    }
    const post = new Post({
      author: req.body.author,
      title: req.body.title,
      metaTitle: req.body.metaTitle,
      published: req.body.published,
      publishedAt: req.body.publishedAt,
      content: req.body.content,
      comments: req.body.comments,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  }),
];

// update post

export const updatePost = asyncHandler(async (req, res, next) => {});

// delete post

export const deletePost = asyncHandler(async (req, res, next) => {});
