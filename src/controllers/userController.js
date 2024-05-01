import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';
import CustomError from '../utils/CustomError.js';

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

// return specific user by ID
export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).exec();
  res.json(user);
});

// create user
export const createUser = [
  // Validate and sanitize fields
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  body('email')
    .trim()
    .isEmail()
    .escape()
    .withMessage('Email must be specified')
    .toLowerCase(),
  body('firstName')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Please use valid characters in first name')
    .optional(),
  body('lastName')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Please use valid characters in last name')
    .optional(),

  // Process request after validation and sanitation
  asyncHandler(async (req, res, next) => {
    // Extract validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Return them to the client
      // This pulls the first error message in validationResult errors[]
      next(new CustomError(errors.array()[0].msg, 400));
    } else {
      // create new user model based on params
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      // TODO - password hashing

      const result = await user.save();
      res.status(201).json(result);
    }
  }),
];

// update user

export const updateUser = [
  // Validate and sanitize fields
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Username must be specified')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  body('email')
    .trim()
    .isEmail()
    .escape()
    .withMessage('Email must be specified')
    .toLowerCase(),
  body('firstName')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Please use valid characters in first name')
    .optional(),
  body('lastName')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Please use valid characters in last name')
    .optional(),

  // Process request after validation and sanitation
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Return them to the client
      // This pulls the first error message in validationResult errors[]
      next(new CustomError(errors.array()[0].msg, 400));
    } else {
      const { userId } = req.params;
      const user = new User({
        _id: userId,
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      const updatedUser = await User.findByIdAndUpdate(userId, user, {
        returnDocument: 'after',
      });
      res.status(200).json(updatedUser);
    }
  }),
];

// delete user

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete(userId);
  res.status(200).json({ message: 'User deleted', _id: deletedUser._id });
});
