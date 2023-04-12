import {cookieParser} from '../utilities/cookieParser';
import {cookieEncoder} from '../utilities/cookieEncoder';

export class BrowserCookieClient implements Micra.CookieClient {
  get #cookies() {
    return cookieParser(document.cookie);
  }

  get(): Micra.Cookie[] {
    return this.#cookies;
  }

  set(cookie: Micra.Cookie): void {
    document.cookie = cookieEncoder(cookie);
  }

  toString(): string[] {
    return this.#cookies.map(cookieEncoder);
  }
}
