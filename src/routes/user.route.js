import express from 'express';
import passport from 'passport';

import { signup, getUser, getUserRecipes, getUserEquipments, createUserEquipment } from '../controllers/user.controller';

const requireAuth = passport.authenticate('jwt', { session: false });


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /users - Create new user */
  .post(signup);

router.route('/:userId')
  /** GET /users/:fermentableId - Get user */
  .get(requireAuth, getUser);

router.route('/:userId/recipes')
  /** GET /users/:userId/recipes - Get all recipes for user */
  .get(requireAuth, getUserRecipes);

router.route('/:userId/equipments')
  /** GET /users/:userId/equipments - Get all equipment profiels for user */
  .get(requireAuth, getUserEquipments)

  /** POST /users/:userId/equipments - Create equipment profiels for user */
  .post(requireAuth, createUserEquipment);

//   /** PUT /fermentables/:userId - Update user */
//   .put(hopCtrl.update)
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(hopCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', hopCtrl.load);

export default router;
