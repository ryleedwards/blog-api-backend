import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';

// return all users
export const getUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find()
    .sort({
      lastName: 1,
      firstName: 1,
      username: 1,
    })
    .exec();
  res.json(allUsers);
});

// return specific user by ID param
export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).exec();
  res.json(user);
});
