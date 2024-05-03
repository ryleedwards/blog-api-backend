import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log(password);
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
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json(req.user);
    // TODO - issue JWT
  }
);

export default router;
