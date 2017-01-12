import express from 'express';
import { version } from '../../package.json';
import fermentableRoutes from './fermentable.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /users
router.use('/fermentables', fermentableRoutes);

// API metadata at the root
router.get('/', (req, res) => {
  res.json({ version });
});


export default router;
