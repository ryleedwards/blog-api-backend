import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Post from '../models/post.js';
import CustomError from '../utils/CustomError.js';

// return all posts

export const getPosts = asyncHandler(async (req, res, next) => {});

// return specific post by ID

export const getPost = asyncHandler(async (req, res, next) => {});

// create post

export const createPost = asyncHandler(async (req, res, next) => {});

// update post

export const updatePost = asyncHandler(async (req, res, next) => {});

// delete post

export const deletePost = asyncHandler(async (req, res, next) => {});
