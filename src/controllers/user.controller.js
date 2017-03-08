import bluebird from 'bluebird';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Recipe from '../models/recipe.model';
import Approved from '../models/approved.model';

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};


mongoose.Promise = bluebird;

export const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.send(err));
};

export const getUserRecipes = (req, res) => {

  let userId;
  // use either the user id from the URL parma, or from the JWT response.
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    userId = req.params.userId;
  } else if (mongoose.Types.ObjectId.isValid(req.user.id)) {
    userId = req.user.id;
  } else {
    return res.status(400).send({ error: 'User ID is invalid' });
  }

  Recipe.find({ owner: userId }).select('-__v -owner')
    .then(recipes => res.json(recipes))
    .catch(err => res.send(err));

  return null;
};


export const signin = (req, res) => {
  res.send({
    token: tokenForUser(req.user),
    id: req.user.id,
  });
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
        .then(res.json({
          token: tokenForUser(user),
          id: res.id,
        }))
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
