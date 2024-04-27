import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema(
  {
    username: { type: String, required: true, index: true, unique: true },
    email: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
      unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    hash: { type: String },
    salt: { type: String },
    role: { type: mongoose.Types.ObjectId, ref: 'Role' },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseUniqueValidator, { message: 'is already taken.' });

const User = mongoose.model('User', userSchema);
export default User;
