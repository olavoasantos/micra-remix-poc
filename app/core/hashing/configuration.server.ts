export class HashConfigurations implements Application.HashConfigurations {
  drivers: Application.HashConfigurations['drivers'] = {
    bcrypt: {
      rounds: 10,
    },

    argon2: {
      type: 'argon2id',
    },
  };
}
