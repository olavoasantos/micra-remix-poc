export class CacheConfigurations implements Application.CacheConfigurations {
  drivers: Application.CacheConfigurations['drivers'] = {
    memory: {
      stringify: true,
      ttl: 0,
      checkPeriod: 600,
      errorOnMissing: false,
      deleteOnExpire: true,
      maxKeys: 1000,
    },
  };
}
