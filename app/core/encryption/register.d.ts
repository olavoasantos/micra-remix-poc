import type {CipherKey, BinaryLike} from 'crypto';

declare global {
  namespace Application {
    interface EncryptionConfigurations {
      key: CipherKey;
      iv: BinaryLike;
    }

    interface Configurations {
      encryption: EncryptionConfigurations;
    }

    interface Services {
      encryption: Micra.Encrypter;
    }
  }

  namespace Micra {
    interface EncryptOptions {
      serialize?: boolean;
      key?: CipherKey;
      iv?: BinaryLike;
    }
    interface DecryptOptions {
      deserialize?: boolean;
      key?: CipherKey;
      iv?: BinaryLike;
    }

    interface Encrypter {
      /**
       * Encrypt the given value.
       */
      encrypt(value: any, options?: EncryptOptions): string;

      /**
       * Decrypt the given value.
       */
      decrypt(payload: string, options?: DecryptOptions): string;

      /**
       * Get the encryption key that the encrypter is currently using.
       */
      getKey(): string;
    }
  }
}

export {};
