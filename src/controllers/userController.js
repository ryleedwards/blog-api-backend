import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';

// return all users
export const user_list_all = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find()
    .sort({
      lastName: 1,
      firstName: 1,
      username: 1,
    })
    .exec();
  res.json(allUsers);
});
