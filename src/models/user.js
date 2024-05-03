import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';

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
    password: { type: String, required: true },
    role: { type: mongoose.Types.ObjectId, ref: 'Role' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.plugin(mongooseUniqueValidator, { message: 'is already taken.' });

const User = mongoose.model('User', userSchema);
export default User;
