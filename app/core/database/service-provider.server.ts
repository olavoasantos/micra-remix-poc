import {PrismaClient} from '@prisma/client';

export const DatabaseServiceProvider: Micra.ServiceProvider = {
  register({container}) {
    container.singleton('database', PrismaClient);
  },

  async boot({container}) {
    const database = container.use('database');
    await database.$connect();
  },
};
