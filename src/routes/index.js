import express from 'express';
import { version } from '../../package.json';
import fermentableRoutes from './fermentable.route';
import styleRoutes from './style.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/fermentables', fermentableRoutes);
router.use('/styles', styleRoutes);


// API metadata at the root
router.get('/', (req, res) => {
  res.json({ version });
});


export default router;
