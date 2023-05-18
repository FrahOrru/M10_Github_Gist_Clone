import express, { Request, Response } from 'express';
import passport from 'passport';

const router: express.Express = express();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    res.redirect('/dashboard');
  }
);

export default router;