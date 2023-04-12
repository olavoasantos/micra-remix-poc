import {GoogleStrategy} from './classes/GoogleStrategy';

export class AuthConfiguration implements Application.AuthConfiguration {
  key: Application.AuthSessionKey = 'user';

  loginPathname = env('AUTH_LOGIN_ROUTE', '/auth/login')!;

  successPathname = env('AUTH_LOGIN_SUCCESS_ROUTE', '/')!;

  drivers = {
    google: {
      driver: GoogleStrategy,
      options: {
        clientID: env('AUTH_GOOGLE_CLIENT_ID', 'MISSING AUTH_GOOGLE_CLIENT_ID'),
        clientSecret: env(
          'AUTH_GOOGLE_CLIENT_SECRET',
          'MISSING AUTH_GOOGLE_CLIENT_SECRET',
        ),
        callbackURL: `${env('AUTH_GOOGLE_HOST')}/auth/google/callback`,
        scope: env('AUTH_GOOGLE_SCOPE'),
        accessType: env('AUTH_GOOGLE_ACCESS_TYPE'),
        prompt: env('AUTH_GOOGLE_PROMPT'),
      },
    },
  };
}
