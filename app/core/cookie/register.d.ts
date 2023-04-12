declare global {
  namespace Application {
    interface CookiesConfiguration {
      secrets: string[];
    }
    interface Services {
      cookies: Micra.CookieStorage;
      CookieClient: Micra.CookieClient;
    }

    interface Configurations {
      cookies: CookiesConfiguration;
    }
  }

  namespace Micra {
    type CookieSameSite = 'none' | 'lax' | 'strict';

    interface Cookie {
      domain?: string;
      expires?: Date;
      maxAge?: number;
      httpOnly?: boolean;
      name: string;
      path?: string;
      secure?: boolean;
      sameSite?: CookieSameSite | string;
      value: any;
    }

    interface CookieStorage {
      get(key: string): Cookie | null;
      set(
        key: string,
        value: any,
        options?: Omit<Cookie, 'name' | 'value'>,
      ): Cookie;
      remove(key: string): Cookie | null;
      has(key: string): boolean;
      clear(): boolean;
      keys(): Cookie['name'][];
      key(index: number): Cookie | null;
    }

    interface CookieClient {
      get(): Cookie[];
      set(value: Cookie): void;
      toString(): string[];
    }
  }
}

export {};
