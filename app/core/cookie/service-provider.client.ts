import {CookieStorage} from './classes/CookieStorage';
import {BrowserCookieClient} from './classes/BrowserCookieClient';

export const CookieServiceProvider: Micra.ServiceProvider = {
  register({container}) {
    container.singleton('CookieClient', BrowserCookieClient);
    container.factory(
      'cookies',
      () => new CookieStorage(container.use('CookieClient')),
    );
  },
};
