import express from 'express';
import { version } from '../../package.json';

// routes
import fermentableRoutes from './fermentable.route';
import hopRoutes from './hop.route';
import styleRoutes from './style.route';
import yeastRoutes from './yeast.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/fermentables', fermentableRoutes);
router.use('/styles', styleRoutes);
router.use('/hops', hopRoutes);
router.use('/yeasts', yeastRoutes);


// API metadata at the root
router.get('/', (req, res) => {
  res.json({ version });
});


export default router;
