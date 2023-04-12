export class CookieStorage implements Micra.CookieStorage {
  protected client: Micra.CookieClient;

  protected jarIndex: Set<Micra.Cookie['name']> = new Set();

  protected jar: Record<Micra.Cookie['name'], Micra.Cookie> = {};

  constructor(client: Micra.CookieClient) {
    this.client = client;
    this.hydrate();
  }

  protected hydrate() {
    this.client.get().forEach((cookie) => {
      if (!this.jarIndex.has(cookie.name)) {
        this.jarIndex.add(cookie.name);
      }

      this.jar[cookie.name] = cookie;
    });
  }

  get(name: string): Micra.Cookie | null {
    if (this.has(name)) {
      return this.jar[name];
    }

    return null;
  }

  set(
    name: string,
    value: any,
    options: Omit<Micra.Cookie, 'name' | 'value'> = {},
  ): Micra.Cookie {
    const cookie: Micra.Cookie = {
      ...options,
      name,
      value,
    };

    this.jar[cookie.name] = cookie;
    this.jarIndex.add(cookie.name);
    this.client.set(cookie);

    return cookie;
  }

  remove(name: string): Micra.Cookie | null {
    if (this.has(name)) {
      const cookie = this.get(name) ?? {};
      this.set(name, {}, {...cookie, expires: new Date('01/01/1970')});
      delete this.jar[name];
      this.jarIndex.delete(name);
    }

    return null;
  }

  has(name: string): boolean {
    return this.jarIndex.has(name);
  }

  clear(): boolean {
    this.jarIndex.forEach((cookie) => this.remove(cookie));
    this.flush();

    return true;
  }

  keys(): string[] {
    return [...this.jarIndex];
  }

  key(index: number): Micra.Cookie | null {
    return this.jar[this.keys()[index]] ?? null;
  }

  protected sign(value: Micra.Cookie['value']) {
    return value;
  }

  protected unsign(value: Micra.Cookie['value']) {
    return value;
  }

  protected flush() {
    this.jar = {};
    this.jarIndex.clear();
  }
}
