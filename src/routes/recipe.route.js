import express from 'express';
import { add } from '../controllers/recipe.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /users - Create new user */
  .post(add);

// router.route('/:userId')
  /** GET /fermentables/:fermentableId - Get user */
  // .get(get);

//   /** PUT /fermentables/:userId - Update user */
//   .put(hopCtrl.update)
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(hopCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', hopCtrl.load);

export default router;
