import express from 'express';
import passport from 'passport';

import { addRecipe, getRecipe, updateRecipe } from '../controllers/recipe.controller';

const router = express.Router(); // eslint-disable-line new-cap
const requireAuth = passport.authenticate('jwt', { session: false });


router.route('/')
  /** POST /users - Create new user */
  .post(requireAuth, addRecipe);

router.route('/:recipeId')
  /** GET /recips/:recipeId - Get recipe */
  .get(requireAuth, getRecipe)

  /** PUT /fermentables/:userId - Update user */
  .put(requireAuth, updateRecipe);
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(hopCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', hopCtrl.load);

export default router;
