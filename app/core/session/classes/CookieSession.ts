import {generateId} from '../utilities/generateId';
import {HTTPError} from '@micra/error';

export class CookieSession implements Micra.Session {
  #isDirty: boolean;
  #isEmpty: boolean;
  #map: Map<string, any>;
  #flashes: [key: string, value: unknown][] = [];

  get data(): Application.Session {
    return Object.fromEntries(this.#map) as Application.Session;
  }

  get isEmpty(): boolean {
    return this.#isEmpty;
  }

  get isDirty(): boolean {
    return this.#isDirty;
  }

  constructor(private cookies: Micra.CookieStorage, private key: string) {
    const initialValue = this.cookies.get(this.key)?.value;
    this.#isDirty = false;
    this.#isEmpty = initialValue == null;
    this.#map = new Map(
      Object.entries(initialValue ?? {id: generateId('session')}),
    );
  }

  exists(key: string): boolean {
    return this.has(key) || this.wasFlashed(key);
  }

  has(key: string): boolean {
    return this.#map.has(key);
  }

  wasFlashed(key: string): boolean {
    return this.#map.has(this.#makeFlashKey(key));
  }

  missing(key: string): boolean {
    return !this.exists(key);
  }

  get(key: string) {
    if (this.#map.has(key)) return this.#map.get(key);

    const flashKey = this.#makeFlashKey(key);
    if (this.has(flashKey)) {
      const value = this.#map.get(flashKey);
      this.delete(flashKey);
      this.#flashes.push([key, value]);
      return value;
    }

    return null;
  }

  pop(key: string) {
    const value = this.get(key);
    this.delete(key);
    return value;
  }

  set<Value>(key: string, value: Value): Value {
    if (this.wasFlashed(key)) {
      this.delete(key);
    }

    this.#map.set(key, value);
    this.#isDirty = true;
    this.#isEmpty = false;
    return value;
  }

  push(key: string, value: any): void {
    if (this.exists(key)) {
      const wasFlashed = this.wasFlashed(key);
      const current = this.get(key);
      if (Array.isArray(current)) {
        const newValue = current.concat(value);
        if (wasFlashed) {
          this.flash(key, newValue);
        } else {
          this.set(key, newValue);
        }
      } else {
        throw new HTTPError(
          500,
          `Cannot push into "${key}" as it's not an array`,
        );
      }
    } else {
      this.set(key, [value]);
    }
  }

  increment(key: string, by = 1): void {
    if (this.exists(key)) {
      const wasFlashed = this.wasFlashed(key);
      const value = this.get(key);
      if (typeof value === 'number') {
        const newValue = value + by;
        if (wasFlashed) {
          this.flash(key, newValue);
        } else {
          this.set(key, newValue);
        }
      } else {
        throw new HTTPError(
          500,
          `Cannot increment "${key}" as it's not a number`,
        );
      }
    } else {
      this.set(key, by);
    }
  }

  decrement(key: string, by = 1): void {
    if (this.exists(key)) {
      const wasFlashed = this.wasFlashed(key);
      const value = this.get(key);
      if (typeof value === 'number') {
        const newValue = value - by;
        if (wasFlashed) {
          this.flash(key, newValue);
        } else {
          this.set(key, newValue);
        }
      } else {
        throw new HTTPError(
          500,
          `Cannot decrement "${key}" as it's not a number`,
        );
      }
    } else {
      this.set(key, 0 - by);
    }
  }

  flash<Value>(key: string, value: Value): Value {
    if (this.has(key)) {
      this.delete(key);
    }
    return this.set(this.#makeFlashKey(key), value);
  }

  reflash(...only: string[]): void {
    this.#flashes = this.#flashes.reduce(
      (flashes: [string, unknown][], [key, value]) => {
        if (only.length === 0 || only.includes(key)) {
          this.flash(key, value);
        } else {
          flashes.push([key, value]);
        }

        return flashes;
      },
      [],
    );
  }

  delete(...keys: string[]): void {
    keys.forEach((key) => {
      if (this.has(key)) {
        this.#map.delete(key);
        this.#isDirty = true;
      } else if (this.wasFlashed(key)) {
        this.#map.delete(this.#makeFlashKey(key));
        this.#isDirty = true;
      }
    });
  }

  flush(): void {
    this.delete(...this.#map.keys());
  }

  #makeFlashKey(key: string) {
    return `__flash_${key}__`;
  }
}
