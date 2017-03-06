import express from 'express';
import passport from 'passport';
import hopCtrl from '../controllers/hop.controller';

const router = express.Router(); // eslint-disable-line new-cap
const requireAuth = passport.authenticate('jwt', { session: false });

router.route('/')
  /** GET /users - Get list of users */
  .get(requireAuth, hopCtrl.list);

// /** POST /fermentables - Create new fermentable */
// .post(hopCtrl.create);

// router.route('/:fermentableId')
//   /** GET /fermentables/:fermentableId - Get user */
//   .get(hopCtrl.get)
//
//   /** PUT /fermentables/:userId - Update user */
//   .put(hopCtrl.update)
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(hopCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', hopCtrl.load);

export default router;
