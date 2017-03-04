import bluebird from 'bluebird';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Approved from '../models/approved.model';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};


mongoose.Promise = bluebird;

export const signin = (req, res) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // TEMP CODE
  // return true if user is on the approved list
  let approvedUser;
  Approved.findOne({ email })
    .then((approvedEmail) => {
      approvedUser = approvedEmail ? true : false;
    });
  // END TEMP CODE

  if (!email || !password) {
    return res.status(422).send({ error: 'You must supply both an email and a password' });
  }


  // See if user with given email exists
  User.findOne({ email })
    .then((existingUser) => {
      // TEMP
      // only allow if user is on approved list
      if (approvedUser === false) {
        return res.status(422).send({ error: 'Email address is not approved. Please contact hello@dapper.com for an invite' });
      }

      // If user already exists, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'That email is registered to an existing account' });
      }

      if (approvedUser) {
        // If a user does NOT exist, create and save user record
        const user = new User({
          email,
          password,
          role: 'beta',
        });
        // save user
        user.save()
        // Respond to request
        .then(res.json({ token: tokenForUser(user) }))
        .then(res.status(201))
        .catch((err) => {
          throw new Error(err);
        });
      }

      return null;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return null;
};
