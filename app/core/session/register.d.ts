declare global {
  namespace Application {
    /**
     * The session data.
     */
    interface Session {
      //
    }

    interface SessionDriverOptions {
      /**
       * Cookie based session driver.
       */
      cookie: {
        /**
         * The name of the cookie.
         */
        key: string;
        /**
         * The cookie options.
         */
        cookie: Omit<Micra.Cookie, 'name' | 'value'>;
      };
    }

    interface SessionConfiguration {
      drivers: SessionDriverOptions;
    }

    interface Services {
      session: Micra.Session;
      SessionManager: Micra.SessionManager;
    }

    interface Configurations {
      session: Application.SessionConfiguration;
    }

    interface EnvironmentVariables {
      SESSION_DRIVER: keyof SessionDriverOptions;
    }
  }

  namespace Micra {
    interface Session {
      /**
       * Returns the session data.
       */
      readonly data: Application.Session;
      /**
       * Returns true if the session is empty.
       */
      readonly isEmpty: boolean;
      /**
       * Returns true if the session has been modified.
       */
      readonly isDirty: boolean;
      /**
       * Returns true if the key exists in the session or was flashed.
       */
      exists(key: string): boolean;
      /**
       * Returns true if the key exists in the session.
       */
      has(key: string): boolean;
      /**
       * Returns true if the key was flashed.
       */
      wasFlashed(key: string): boolean;
      /**
       * Returns true if the key neither exists in the session nor was flashed.
       */
      missing(key: string): boolean;
      /**
       * Returns the value of the key in the session or null if it doesn't exist.
       */
      get(key: string): any;
      /**
       * Returns the value of the key and removes it from the session. If the key doesn't exist, null is returned.
       */
      pop(key: string): any;
      /**
       * Sets the value of the key in the session.
       */
      set<Value>(key: string, value: Value): Value;
      /**
       * Pushes the value to the array of the key in the session.
       */
      push<Value>(key: string, value: Value): void;
      /**
       * Increments the value of the key in the session by the given amount.
       */
      increment(key: string, by?: number): void;
      /**
       * Decrements the value of the key in the session by the given amount.
       */
      decrement(key: string, by?: number): void;
      /**
       * Flashes the value of the key in the session. The value will be removed from the session once it is accessed.
       */
      flash<Value>(key: string, value: Value): Value;
      /**
       * Persists a given flash value after it has been accessed.
       */
      reflash(...only: string[]): void;
      /**
       * Removes the values with keys from the session.
       */
      delete(...keys: string[]): void;
      /**
       * Removes all values from the session.
       */
      flush(): void;
    }

    interface SessionManager {
      /**
       * Returns the active session.
       */
      get(): Promise<Session>;
      /**
       * Returns true if a session exists.
       */
      has(): Promise<boolean>;
      /**
       * Destroys the active session.
       */
      destroy(): Promise<void>;
      /**
       * Commits changes to a given session.
       */
      commit(session: Micra.Session): Promise<void>;
    }
  }
}

export {};
