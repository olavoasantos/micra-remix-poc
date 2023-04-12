import crypto from 'crypto';

export class NodeEncrypter implements Micra.Encrypter {
  constructor(
    private readonly configurations: Application.EncryptionConfigurations,
  ) {}

  encrypt(
    value: any,
    {serialize = true, key, iv}: Micra.EncryptOptions,
  ): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      key ?? this.configurations.key,
      iv ?? this.configurations.iv,
    );

    const encrypted = cipher.update(
      serialize ? JSON.stringify(value) : value,
      'utf8',
      'base64',
    );

    return `${encrypted}${cipher.final('base64')}`;
  }

  decrypt(
    payload: string,
    {deserialize = true, key, iv}: Micra.DecryptOptions,
  ): string {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      key ?? this.configurations.key,
      iv ?? this.configurations.iv,
    );
    const result = cipher.update(payload, 'base64', 'utf8');
    const decrypted = deserialize ? JSON.parse(result) : result;
    return `${decrypted}${cipher.final('utf8')}`;
  }

  getKey(): string {
    return this.configurations.key.toString();
  }
}
