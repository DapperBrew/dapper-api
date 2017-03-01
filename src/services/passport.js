import bluebird from 'bluebird';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model';

mongoose.Promise = bluebird;


// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  // check to see if the username exists
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => done(err));
}));


// Local Strategy
const localOptions = { usernameField: 'email' };

passport.use(new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }
        return done(null, user);
      });
      return null;
    })
    .catch(err => done(err));
}));
