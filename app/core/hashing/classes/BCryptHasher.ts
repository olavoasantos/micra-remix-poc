import bcrypt from 'bcrypt';

export class BCryptHasher implements Micra.Hasher {
  constructor(
    private readonly configurations: Application.HashConfigurations,
  ) {}

  async make(value: any) {
    const salt = await bcrypt.genSalt(
      this.configurations.drivers.bcrypt.rounds,
    );
    return await bcrypt.hash(value, salt);
  }

  async check(value: any, hashedValue: any) {
    return await bcrypt.compare(value, hashedValue);
  }
}
