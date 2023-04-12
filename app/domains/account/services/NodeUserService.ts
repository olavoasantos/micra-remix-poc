import {User} from '../guards/User';

export class NodeUserService implements Application.UserService {
  constructor(private readonly userDataSource: Application.UserDataSource) {}

  async findByEmail(dto: Application.FindUserByEmailDto) {
    const result = await this.userDataSource.findByEmail(dto);

    if (result == null) {
      return null;
    }

    const user = User(result);

    if (!user.valid) {
      throw user.error;
    }

    return user.value;
  }

  async create(dto: Application.CreateUserDto) {
    const result = await this.userDataSource.create(dto);

    const user = User(result);

    if (!user.valid) {
      throw user.error;
    }

    return user.value;
  }
}
