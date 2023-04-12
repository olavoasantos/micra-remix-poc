declare global {
  namespace Application {
    interface HashConfigurations {
      drivers: {
        bcrypt: {
          rounds: number;
        };

        argon2: {
          type?: 'argon2d' | 'argon2i' | 'argon2id' | 0 | 1 | 2;
        };
      };
    }

    interface Configurations {
      hash: HashConfigurations;
    }

    interface Services {
      hash: Micra.Hasher;
    }

    interface EnvironmentVariables {
      HASH_DRIVER: keyof Application.HashConfigurations['drivers'];
    }
  }

  namespace Micra {
    interface Hasher {
      /**
       * Hash the given value.
       */
      make(value): Promise<string>;

      /**
       * Check the given plain value against a hash.
       */
      check(value, hashedValue): Promise<boolean>;
    }
  }
}

export {};
