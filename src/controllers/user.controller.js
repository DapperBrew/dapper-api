/* eslint-disable no-underscore-dangle */

import bluebird from 'bluebird';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Recipe from '../models/recipe.model';
import Approved from '../models/approved.model';

mongoose.Promise = bluebird;

// Utility

// returns a token for a user
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};

// Returns either the user id from the URL param, or from the JWT response.
export const getUserId = (req) => {
  let userId;
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    userId = req.params.userId;
  } else if (mongoose.Types.ObjectId.isValid(req.user.id)) {
    userId = req.user.id;
  }
  return userId;
};
// END UTILITY


// GET USER
export const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.send(err));
};


// GET USER/RECIPES
export const getUserRecipes = (req, res) => {
  const userId = getUserId(req);

  Recipe.find({ owner: userId }).select('-__v -owner')
    .then(recipes => res.json(recipes))
    .catch(err => res.send(err));

  return null;
};

// GET USER/EQUIPMENTS
export const getUserEquipments = (req, res) => {
  const userId = getUserId(req);

  User.findById(userId, 'equipments')
    .then(user => res.json(user.equipments))
    .catch(err => res.send(err));

  return null;
};

// PUT/CREATE USER/EQUIPMENTS
export const createUserEquipment = (req, res) => {
  const userId = getUserId(req).toString();

  User.findById(userId)
    .then((user) => {
      user.equipments.push({ ...req.body });
      user.save();
      return user.equipments.slice(-1)[0];
    })
    .then((equipment) => {
      res.status(201).send({
        message: 'Equipment profile saved.',
        equipmentProfile: equipment,
        id: equipment._id,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  return null;
};

// EDIT EQUIPMENT
export const editUserEquipment = (req, res) => {
  const userId = getUserId(req).toString();
  const id = req.params.equipmentId.toString();

  User.findOneAndUpdate({ _id: userId, 'equipments._id': id }, { $set: { 'equipments.$': req.body.equipment } }, { new: true })
    .then(() => {
      res.status(201).send({ message: 'Equipment Profile updated' });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

// SIGN IN user
export const signin = (req, res) => {
  res.send({
    token: tokenForUser(req.user),
    id: req.user.id,
  });
};

export const validate = (req, res, next) => {
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('passwordConfirm', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('passwordConfirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.status(422).send({ error: `${errors[0].msg}` });
  }
  next();
  return null;
};

// SIGN UP USER
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
        return res.status(422).send({ error: 'Email address is not approved. Please contact dan@dapperbrew.com for an invite' });
      }

      // If user already exists, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'That email is registered to an existing account' });
      }

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
      return null;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return null;
};
