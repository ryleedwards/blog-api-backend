import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';
import { mongooseUniqueValidator as uniqueValidator } from 'mongoose-unique-validator';

const UserSchema = new Schema(
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
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const User = mongoose.model('User', UserSchema);
export default User;
