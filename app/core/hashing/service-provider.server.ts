import {HTTPError} from '@micra/error';
import {BCryptHasher} from './classes/BCryptHasher';
import {Argon2Hasher} from './classes/Argon2Hasher';

export const HashServiceProvider: Micra.ServiceProvider = {
  register({container, configuration, environment}) {
    const hashConfigurations = configuration.get('hash');
    const driver = environment.get('HASH_DRIVER', 'argon2');

    if (!hashConfigurations) {
      throw new HTTPError(500, 'Hash configurations not found.');
    }

    if (driver === 'argon2') {
      container.factory('hash', () => new Argon2Hasher(hashConfigurations));
    } else if (driver === 'bcrypt') {
      container.factory('hash', () => new BCryptHasher(hashConfigurations));
    } else {
      throw new HTTPError(500, `Hash driver ${driver} not found.`);
    }
  },
};
