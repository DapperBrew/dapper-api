import express from 'express';
import passport from 'passport';

import fermentableCtrl from '../controllers/fermentable.controller';

const router = express.Router(); // eslint-disable-line new-cap
const requireAuth = passport.authenticate('jwt', { session: false });


router.route('/')
  /** GET /fermentables - Get list of fermentables */
  .get(requireAuth, fermentableCtrl.list);


// /** POST /fermentables - Create new fermentable */
// .post(fermentableCtrl.create);

// router.route('/:fermentableId')
//   /** GET /fermentables/:fermentableId - Get user */
//   .get(fermentableCtrl.get)
//
//   /** PUT /fermentables/:userId - Update user */
//   .put(fermentableCtrl.update)
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(fermentableCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', fermentableCtrl.load);

export default router;
