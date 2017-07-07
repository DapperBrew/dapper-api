/* eslint-disable no-underscore-dangle */
import bluebird from 'bluebird';
import mongoose from 'mongoose';
import Recipe from '../models/recipe.model';
import User from '../models/user.model';

mongoose.Promise = bluebird;

// Add a new Recipe
export const addRecipe = (req, res) => {
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

// Retrieve a single recipe
export const getRecipe = (req, res) => {
  Recipe.findById(req.params.recipeId).select('-__v -owner -_id -createdAt -updatedAt')
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.send(err));
};

// Edit a recipe
export const updateRecipe = (req, res) => {
  const id = req.params.recipeId.toString();
  // remove "updatedAt" & "_id". (breaks otherwise)
  delete req.body.recipe.updatedAt;
  delete req.body.recipe._id;
  Recipe.findByIdAndUpdate(id, req.body.recipe, { new: true })
    .then(recipe => res.status(201).json(recipe));
};
