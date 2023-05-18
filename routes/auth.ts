import express, { Request, Response } from 'express';
import passport from 'passport';

const router: express.Express = express();

// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Redirect or respond as needed after successful authentication
    res.redirect('/dashboard');
  }
);

export default router;