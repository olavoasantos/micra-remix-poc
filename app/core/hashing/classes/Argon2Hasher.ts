import argon2 from 'argon2';

export class Argon2Hasher implements Micra.Hasher {
  private types = {
    argon2id: argon2.argon2id,
    argon2i: argon2.argon2i,
    argon2d: argon2.argon2d,
    2: argon2.argon2id,
    1: argon2.argon2i,
    0: argon2.argon2d,
  };

  constructor(
    private readonly configurations: Application.HashConfigurations,
  ) {}

  async make(value: any) {
    return await argon2.hash(value, {
      type: this.types[
        this.configurations.drivers.argon2.type as keyof typeof this.types
      ],
    });
  }

  async check(value: any, hashedValue: any) {
    return await argon2.verify(hashedValue, value);
  }
}
