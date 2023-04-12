declare global {
  namespace Application {
    interface CacheConfigurations {
      drivers: {
        memory: {
          /**
           * If enabled, all values will be stringified during the set operation
           */
          stringify?: boolean;

          /**
           * standard time to live in seconds. 0 = infinity
           */
          ttl?: number;

          /**
           * time in seconds to check all data and delete expired keys
           */
          checkPeriod?: number;

          /**
           * Whether an error should be thrown when trying to get a non-existing key.
           */
          errorOnMissing?: boolean;

          /**
           * Whether variables will be deleted automatically when they expire. If true the variable will be deleted. If
           * false the variable will remain. You are encouraged to handle the variable upon the event expired by yourself.
           */
          deleteOnExpire?: boolean;

          /**
           * max amount of keys that are being stored.
           * set operations will throw an error when the cache is full
           */
          maxKeys?: number;
        };
      };
    }

    interface Configurations {
      cache: CacheConfigurations;
    }

    interface Services {
      cache: Micra.Cache;
    }

    interface EnvironmentVariables {
      CACHE_DRIVER: keyof Application.CacheConfigurations['drivers'];
    }
  }

  namespace Micra {
    interface Cache {
      /**
       * It connects to the cache source
       */
      connect(): Promise<void>;

      /**
       * Fetches a value from the cache.
       */
      get<Value = unknown>(key: string): Promise<Value | undefined>;
      get<Value = unknown>(key: string, fallback: Value): Promise<Value>;
      get<Value = unknown>(
        key: string,
        fallback?: Value,
      ): Promise<Value | undefined>;

      /**
       * Persists data in the cache, uniquely referenced by a key with an optional expiration TTL time.
       */
      set(key: string, value: any, ttl?: number): Promise<boolean>;

      /**
       * Delete an item from the cache by its unique key.
       */
      delete(key: string): Promise<boolean>;

      /**
       * Wipes clean the entire cache's keys.
       */
      clear(): Promise<boolean>;

      /**
       * Determines whether an item is present in the cache.
       *
       * NOTE: It is recommended that has() is only to be used for cache warming type purposes
       * and not to be used within your live applications operations for get/set, as this method
       * is subject to a race condition where your has() will return true and immediately after,
       * another script can remove it making the state of your app out of date.
       */
      has(key: string): Promise<boolean>;

      /**
       * Retrieve an item from the cache and delete it.
       */
      pop<Value = unknown>(key: string): Promise<Value | undefined>;
      pop<Value = unknown>(key: string, fallback: Value): Promise<Value>;
      pop<Value = unknown>(
        key: string,
        fallback?: Value,
      ): Promise<Value | undefined>;

      /**
       * Store an item in the cache if the key does not exist.
       */
      add(key: string, value: any, ttl?: number): Promise<boolean>;

      /**
       * Increment the value of an item in the cache.
       */
      increment(key: string, value?: number): Promise<boolean>;

      /**
       * Decrement the value of an item in the cache.
       */
      decrement(key: string, value?: number): Promise<boolean>;

      /**
       * Store an item in the cache indefinitely.
       */
      forever(key: string, value: any): Promise<boolean>;
    }
  }
}

export {};
