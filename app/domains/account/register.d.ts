import type {Maybe} from '~/core/types';

declare global {
  namespace Application {
    interface Session {
      user: {
        email: string;
        name: string;
      };
    }

    interface User {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }

    interface FindUserByEmailDto {
      email: string;
    }

    interface CreateUserDto {
      email: string;
      name: string;
    }

    interface UserDataSource {
      findByEmail(email: FindUserByEmailDto): Promise<Maybe<User> | null>;
      create(dto: CreateUserDto): Promise<Maybe<User>>;
    }

    interface UserService {
      findByEmail(email: FindUserByEmailDto): Promise<User | null>;
      create(dto: CreateUserDto): Promise<User>;
    }

    interface Services {
      UserService: UserService;
      UserDataSource: UserDataSource;
    }
  }
}

export {};
