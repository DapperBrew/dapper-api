import express from 'express';
import miscCtrl from '../controllers/misc.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /users - Get list of users */
  .get(miscCtrl.list);

// /** POST /fermentables - Create new fermentable */
// .post(miscCtrl.create);

// router.route('/:fermentableId')
//   /** GET /fermentables/:fermentableId - Get user */
//   .get(miscCtrl.get)
//
//   /** PUT /fermentables/:userId - Update user */
//   .put(miscCtrl.update)
//
//   /** DELETE /fermentables/:userId - Delete user */
//   .delete(miscCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', miscCtrl.load);

export default router;
