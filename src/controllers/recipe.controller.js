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
  // find the recipe, pass the updated recipe, and flag as new (to return the new recipe)
  Recipe.findOneAndUpdate({ id: req.params.recipeID }, req.body.recipe, { new: true })
    .then(recipe => console.log(recipe))
};

// export const updateRecipe = (req, res) => {
//   Recipe.findById(req.params.recipeId)
//     .then((recipe) => {
//       console.log(recipe);
//       recipe.push({ name: 'test' });
//       recipe.save();
//       console.log(recipe);
//     })
//     // .then(response => console.log(response));
//     .then(response => res.json(response));
// };
