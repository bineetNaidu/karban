import { Router } from 'express';
import { Strategy } from 'passport-github2';
import User from '../../../models/User';
import { PassportStatic } from 'passport';

export default (passport: PassportStatic): Router => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KARBAN_GITHUB_CLIENT_ID!,
        clientSecret: process.env.KARBAN_GITHUB_CLIENT_SECRET!,
        callbackURL: process.env.KARBAN_GITHUB_CALLBACK_URL!,
      },
      // @ts-ignore
      async (_, __, profile, done) => {
        const id = String(profile.id);

        try {
          const userExist = await User.findOne({ githubId: id });

          // Store data from GitHub only on user's first login
          if (userExist) {
            return done(null, userExist);
          }

          const user = User.build({
            avatar: profile._json.avatar_url,
            username: profile.username,
            githubId: id,
          });

          await user.save();

          return done(null, user);
        } catch (e) {
          return done(e, null);
        }
      }
    )
  );

  const router = Router();

  router.get(
    '/',
    passport.authenticate('github', {
      scope: ['user:email'],
      session: true,
    })
  );

  router.get(
    '/callback',
    passport.authenticate('github', {
      successReturnToOrRedirect: 'http://localhost:3000',
      failureRedirect: 'http://localhost:3000',
      session: true,
    })
  );

  return router;
};
