import {FindUserByEmailDto} from './guards/FindUserByEmailDto';
import {CreateUserDto} from './guards/CreateUserDto';
import {NodeUserService} from './services/NodeUserService';
import {DatabaseUserDataSource} from './data-sources/DatabaseUserDataSource';

export const AccountServiceProvider: Micra.ServiceProvider = {
  register({container}) {
    container.factory(
      'UserDataSource',
      (container) => new DatabaseUserDataSource(container.use('database')),
    );

    container.factory(
      'UserService',
      (container) => new NodeUserService(container.use('UserDataSource')),
    );
  },

  boot({container}) {
    const Authenticator = container.use('Authenticator');

    // Authentication logic for the "google" strategy.
    Authenticator.verify('google', async ({profile}) => {
      const UserService = use('UserService');

      const findUserByEmailDto = FindUserByEmailDto({
        email: profile.emails[0].value,
      });

      if (!findUserByEmailDto.valid) {
        throw findUserByEmailDto.error;
      }

      const user = await UserService.findByEmail(findUserByEmailDto.value);

      if (user) {
        return user;
      }

      const createUserDto = CreateUserDto({
        email: profile.emails[0].value,
        name: profile.displayName,
      });

      if (!createUserDto.valid) {
        throw createUserDto.error;
      }

      const newUser = await UserService.create(createUserDto.value);

      return newUser;
    });
  },
};
