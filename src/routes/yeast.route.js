import express from 'express';
import passport from 'passport';
import yeastCtrl from '../controllers/yeast.controller';

const router = express.Router(); // eslint-disable-line new-cap
const requireAuth = passport.authenticate('jwt', { session: false });

router.route('/')
  /** GET /users - Get list of users */
  .get(requireAuth, yeastCtrl.list);

// /** POST /fermentables - Create new fermentable */
// .post(yeastCtrl.create);

// router.route('/:fermentableId')
//   /** GET /fermentables/:fermentableId - Get user */
//   .get(yeastCtrl.get)
//
//   /** PUT /fermentables/:userId - Update user */
//   .put(yeastCtrl.update)
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(yeastCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', yeastCtrl.load);

export default router;
