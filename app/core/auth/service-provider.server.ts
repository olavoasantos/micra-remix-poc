import {HTTPError} from '@micra/error';
import {Authenticator} from './classes/Authenticator';

export const AuthServiceProvider: Micra.ServiceProvider = {
  bootConfiguration({configuration}) {
    const authConfig = configuration.get('auth');
    if (!authConfig) {
      throw new HTTPError(
        500,
        'Missing Auth configuration. Did you remember to register it?',
      );
    }
  },

  register({container, configuration}) {
    const authConfig = configuration.get('auth')!;

    container.factory('Authenticator', () => new Authenticator(authConfig));
  },

  registerRequest({container}) {
    container.factory('auth', () =>
      container
        .use('Authenticator')
        .createHandler(container.use('request'), container.use('session')),
    );
  },
};
