import express from 'express';
import passport from 'passport';

import { signin, forgotPassword, checkResetToken, resetPassword, comparePassword } from '../controllers/user.controller';
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

router.route('/forgot')
  /** POST /forgot - submits email to "forgot password" */
  .post(forgotPassword);

router.route('/reset/:token')
  /** GET /reset:token - checks if reset token is valid */
  .get(checkResetToken);

router.route('/reset')
  /** POST /reset - Resets password */
  .post(comparePassword, resetPassword);

export default router;
