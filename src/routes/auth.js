import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import passportJwt from 'passport-jwt';
const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;
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

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (!user) {
        return done(null, false);
      } else return done(null, user);
    } catch (err) {
      done(err);
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

    // If user is authenticated, return trimmed user info
    const user = {
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };

    // Return access token and trimmed user info
    res.json({ accessToken: accessToken, user: user });
  }
);

export default router;
