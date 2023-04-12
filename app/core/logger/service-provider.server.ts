import {HTTPError} from '@micra/error';
import {PinoLogger} from './classes/PinoLogger';

export const LoggerServiceProvider: Micra.ServiceProvider = {
  register({container, configuration}) {
    const logConfigurations = configuration.get('logger');

    if (!logConfigurations) {
      throw new HTTPError(500, 'Logger configurations not found');
    }

    container.factory('log', () => new PinoLogger(logConfigurations));
  },

  boot({container, environment}) {
    const logger = container.use('log');

    if (environment.get('NODE_ENV') === 'development') {
      logger.use('pino-pretty', {target: 'pino-pretty', level: 'debug'});
    }

    if (environment.get('NODE_ENV') === 'production') {
      logger.use('sentry', {target: 'pino-sentry-transport', level: 'error'});
    }
  },
};
