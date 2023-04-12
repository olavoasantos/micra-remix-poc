import type {PrismaClient} from '@prisma/client';

declare global {
  namespace Application {
    type Database = PrismaClient;

    interface Services {
      database: Database;
    }

    interface Configurations {
      //
    }

    interface EnvironmentVariables {
      //
    }
  }
}

export {};
