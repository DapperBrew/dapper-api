import express from 'express';
import passport from 'passport';

import { signin } from '../controllers/user.controller';
import '../services/passport';

const router = express.Router(); // eslint-disable-line new-cap
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.route('/')
  /** GET /sessions - Checks for valid JWT token. Returns bool */
  .get(requireAuth, (req, res) => {
    res.send({
      isAuth: true,
      id: req.user.id,
    });
  })

  /** POST /sessions - Create session */
  .post(requireSignin, signin);


export default router;
