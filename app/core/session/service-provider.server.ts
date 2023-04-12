import {HTTPError} from '@micra/error';
import {CookieSessionManager} from './classes/CookieSessionManager';

export const SessionServiceProvider: Micra.ServiceProvider = {
  registerRequest({container, configuration, environment}) {
    const sessionConfig = configuration.get('session');

    if (!sessionConfig) {
      throw new HTTPError(
        500,
        'Missing Session config. Did you remember to register it?',
      );
    }

    if (environment.get('SESSION_DRIVER') === 'cookie') {
      container.factory(
        'SessionManager',
        () => new CookieSessionManager(container.use('cookies'), sessionConfig),
      );
    }
  },

  async bootRequest({container}) {
    const SessionManager = container.use('SessionManager');
    container.value('session', await SessionManager.get());
  },

  async completeRequest({container}) {
    const session = container.use('session');
    const SessionManager = container.use('SessionManager');

    if (session.isDirty) {
      await SessionManager.commit(session);
    }
  },
};
