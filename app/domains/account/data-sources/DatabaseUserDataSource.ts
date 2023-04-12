export class DatabaseUserDataSource implements Application.UserDataSource {
  constructor(private readonly db: Application.Services['database']) {}

  async findByEmail(dto: Application.FindUserByEmailDto) {
    return await this.db.user.findFirst({where: dto});
  }

  async create(dto: Application.CreateUserDto) {
    return await this.db.user.create({data: dto});
  }
}
