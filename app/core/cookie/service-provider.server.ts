import {HTTPError} from '@micra/error';
import {CookieStorage} from './classes/CookieStorage';
import {CryptoCookieClient} from './classes/CryptoCookieClient';

export const CookieServiceProvider: Micra.ServiceProvider = {
  registerRequest({container, configuration}) {
    const cookiesConfiguration = configuration.get('cookies');
    if (!cookiesConfiguration) {
      throw new HTTPError(500, 'Missing cookies configuration');
    }

    container.factory(
      'CookieClient',
      () =>
        new CryptoCookieClient(container.use('request'), cookiesConfiguration),
    );
    container.factory(
      'cookies',
      () => new CookieStorage(container.use('CookieClient')),
    );
  },

  completeRequest({container}) {
    const response = container.use('response');
    const cookies = container.use('CookieClient');

    cookies
      .toString()
      .forEach((cookie) => response.headers.append('Set-Cookie', cookie));
  },
};
