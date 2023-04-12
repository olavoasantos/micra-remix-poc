import Cache from 'node-cache';

export class NodeCache implements Micra.Cache {
  private cache!: Cache;

  constructor(
    private readonly configurations: Application.CacheConfigurations,
  ) {}

  async connect(): Promise<void> {
    this.cache = new Cache({
      forceString: this.configurations.drivers.memory.stringify,
      stdTTL: this.configurations.drivers.memory.ttl,
      checkperiod: this.configurations.drivers.memory.checkPeriod,
      errorOnMissing: this.configurations.drivers.memory.errorOnMissing,
      deleteOnExpire: this.configurations.drivers.memory.deleteOnExpire,
      maxKeys: this.configurations.drivers.memory.maxKeys,
    });
  }

  async get<Value = unknown>(
    key: string,
    fallback?: Value,
  ): Promise<Value | undefined> {
    const value = this.cache.get(key);
    return (value ?? fallback) as Value;
  }

  async set(
    key: string,
    value: any,
    ttl?: number | undefined,
  ): Promise<boolean> {
    return ttl ? this.cache.set(key, value, ttl) : this.cache.set(key, value);
  }

  async delete(key: string): Promise<boolean> {
    return this.cache.del(key) > 0;
  }

  async clear(): Promise<boolean> {
    try {
      this.cache.flushAll();
      return true;
    } catch (_) {
      return false;
    }
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async pop<Value = unknown>(
    key: string,
    fallback?: Value,
  ): Promise<Value | undefined> {
    return (this.cache.take(key) ?? fallback) as Value;
  }

  async add(
    key: string,
    value: any,
    ttl?: number | undefined,
  ): Promise<boolean> {
    return (await this.has(key)) ? false : await this.set(key, value, ttl);
  }

  async increment(key: string, value = 1): Promise<boolean> {
    const current = await this.get<number>(key, 0);

    if (current === undefined) {
      return await this.set(key, value);
    } else if (typeof current === 'number') {
      return await this.set(key, current + value);
    }

    return false;
  }

  async decrement(key: string, value = 1): Promise<boolean> {
    const current = await this.get<number>(key, 0);

    if (current === undefined) {
      return await this.set(key, 0 - value);
    } else if (typeof current === 'number') {
      return await this.set(key, current - value);
    }

    return false;
  }

  forever(key: string, value: any): Promise<boolean> {
    return this.set(key, value, 0);
  }
}
