import {HTTPError} from '@micra/error';
import {NodeEncrypter} from './classes/NodeEncrypter';

export const EncryptionServiceProvider: Micra.ServiceProvider = {
  register({container, configuration}) {
    const encryptionConfigurations = configuration.get('encryption');

    if (!encryptionConfigurations) {
      throw new HTTPError(500, 'Encryption configurations not found.');
    }

    container.factory(
      'encryption',
      () => new NodeEncrypter(encryptionConfigurations),
    );
  },
};
