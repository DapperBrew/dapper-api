import bluebird from 'bluebird';
import mongoose from 'mongoose';
import Recipe from '../models/recipe.model';
import User from '../models/user.model';

mongoose.Promise = bluebird;

export const add = (req, res) => {
  const recipe = new Recipe({
    owner: req.user.id,
    ...req.body,
  });
  recipe.save()
    .then(User.findById(req.user.id, (err, user) => {
      if (err) throw new Error(err);
      if (user) {
        user.recipes.push(recipe);
        user.save();
      }
      return null;
    }))
    .then(res.status(201).send({
      message: 'recipe saved',
      id: recipe.id,
      recipe,
    }))
    .catch((err) => {
      throw new Error(err);
    });
};
