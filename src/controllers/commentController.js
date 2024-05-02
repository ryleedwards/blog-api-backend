import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Comment from '../models/comment.js';
import CustomError from '../utils/CustomError.js';

export const getComments = asyncHandler(async (req, res, next) => {});

export const getComment = asyncHandler(async (req, res, next) => {});

export const createComment = asyncHandler(async (req, res, next) => {});

export const updateComment = asyncHandler(async (req, res, next) => {});

export const deleteComment = asyncHandler(async (req, res, next) => {});
