import bluebird from 'bluebird';
import mongoose from 'mongoose';
import Recipe from '../models/recipe.model';

mongoose.Promise = bluebird;


export const add = (req, res) => {

  const recipe = new Recipe(req.body);

  // save recipe
  recipe.save()
  .then(res.status(201).send({
    message: 'recipe saved',
    id: recipe.id,
  }))
  .catch((err) => {
    throw new Error(err);
  });
};
