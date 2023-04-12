export class SessionConfiguration implements Application.SessionConfiguration {
  drivers = {
    cookie: {
      key: '__session',
      cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        secure: true,
        path: '/',
      },
    },
  };
}
