import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import JwtStrategy, { ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const match = await user.comparePassword(password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);

const router = Router();

router.post(
  '/login',
  // Use local strategy to authenticate user
  passport.authenticate('local', { session: false }),
  // If user is authenticated, return access token
  (req, res) => {
    // Generate access token
    const accessToken = jwt.sign(
      req.user.username,
      process.env.ACCESS_TOKEN_SECRET
    );
    // Return access token
    res.json({ message: 'Auth success', accessToken });
  }
);

export default router;
