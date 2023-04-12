import {CookieSession} from './CookieSession';

export class CookieSessionManager implements Micra.SessionManager {
  get options(): Application.SessionDriverOptions['cookie'] {
    return this.configuration.drivers['cookie'];
  }

  constructor(
    private cookies: Micra.CookieStorage,
    private configuration: Application.SessionConfiguration,
  ) {}

  async has(): Promise<boolean> {
    return this.cookies.has(this.options.key);
  }

  async get(): Promise<Micra.Session> {
    return new CookieSession(this.cookies, this.options.key);
  }

  async commit(session: Micra.Session): Promise<void> {
    this.cookies.set(this.options.key, session.data, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
      secure: true,
      ...this.options.cookie,
    });
  }

  async destroy(): Promise<void> {
    this.cookies.set(
      this.options.key,
      {},
      {
        httpOnly: true,
        expires: new Date('01/01/1970'),
        path: '/',
      },
    );
  }
}
