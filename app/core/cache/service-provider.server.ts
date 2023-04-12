import {HTTPError} from '@micra/error';
import {NodeCache} from './classes/NodeCache';

export const CacheServiceProvider: Micra.ServiceProvider = {
  register({container, configuration, environment}) {
    const cacheConfigurations = configuration.get('cache');
    const driver = environment.get('CACHE_DRIVER', 'memory');

    if (!cacheConfigurations) {
      throw new HTTPError(500, 'Cache configurations not found.');
    }

    if (driver === 'memory') {
      container.factory('cache', () => new NodeCache(cacheConfigurations));
    } else {
      throw new HTTPError(500, `Cache driver ${driver} not found.`);
    }
  },

  async boot({container}) {
    await container.use('cache').connect();
  },
};
