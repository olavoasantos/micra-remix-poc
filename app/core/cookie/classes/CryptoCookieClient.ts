import crypto from 'crypto';
import {cookieEncoder} from '../utilities/cookieEncoder';
import {cookieParser} from '../utilities/cookieParser';

export class CryptoCookieClient implements Micra.CookieClient {
  #jar: Map<string, Micra.Cookie> = new Map();

  #cookies: Micra.Cookie[];

  constructor(
    private request: Request,
    private configurations: Application.CookiesConfiguration,
  ) {
    const cookieRecipe = this.request.headers.get('Cookie') ?? '';
    this.#cookies = cookieParser(cookieRecipe).map((cookie) => ({
      ...cookie,
      value: this.#decode(cookie.value),
    }));
  }

  get(): Micra.Cookie[] {
    return this.#cookies;
  }

  set(cookie: Micra.Cookie): void {
    this.#jar.set(cookie.name, cookie);
  }

  toString(): string[] {
    const cookies: string[] = [];
    for (const cookie of this.#jar.values()) {
      cookies.push(
        cookieEncoder({
          ...cookie,
          value: this.#encode(cookie.value),
        }),
      );
    }

    return cookies;
  }

  #encode(value: any): string {
    let encoded = this.#stringify(value);

    if (this.configurations.secrets.length > 0) {
      encoded = this.#sign(encoded, this.configurations.secrets[0]);
    }

    return encoded;
  }

  #decode(value: string): any {
    if (this.configurations.secrets.length > 0) {
      for (const secret of this.configurations.secrets) {
        const unsignedValue = this.#unsign(value, secret);
        if (unsignedValue !== false) {
          return this.#parse(unsignedValue);
        }
      }

      return null;
    }

    return this.#parse(value);
  }

  #parse(value: string): any {
    try {
      return JSON.parse(decodeURIComponent(this.#escape(atob(value))));
    } catch (error: unknown) {
      return {};
    }
  }

  #escape(value: string): string {
    const str = value.toString();
    let result = '';
    let index = 0;
    let chr, code;
    while (index < str.length) {
      chr = str.charAt(index++);
      if (/[\w*+\-./@]/.exec(chr)) {
        result += chr;
      } else {
        code = chr.charCodeAt(0);
        if (code < 256) {
          result += '%' + this.#hex(code, 2);
        } else {
          result += '%u' + this.#hex(code, 4).toUpperCase();
        }
      }
    }
    return result;
  }

  #hex(code: number, length: number): string {
    let result = code.toString(16);
    while (result.length < length) result = '0' + result;
    return result;
  }

  #stringify(value: any): string {
    return btoa(this.#unescape(encodeURIComponent(JSON.stringify(value))));
  }

  #unescape(value: string): string {
    const str = value.toString();
    let result = '';
    let index = 0;
    let chr;
    let part;
    while (index < str.length) {
      chr = str.charAt(index++);
      if (chr === '%') {
        if (str.charAt(index) === 'u') {
          part = str.slice(index + 1, index + 5);
          if (/^[\da-f]{4}$/i.exec(part)) {
            result += String.fromCharCode(parseInt(part, 16));
            index += 5;
            continue;
          }
        } else {
          part = str.slice(index, index + 2);
          if (/^[\da-f]{2}$/i.exec(part)) {
            result += String.fromCharCode(parseInt(part, 16));
            index += 2;
            continue;
          }
        }
      }
      result += chr;
    }
    return result;
  }

  #sign(val: any, secret: string) {
    return `${val}.${crypto
      .createHmac('sha256', secret)
      .update(val)
      .digest('base64')
      .replace(/=+$/, '')}`;
  }

  #unsign(input: string, secret: string) {
    const tentativeValue = input.slice(0, input.lastIndexOf('.'));
    const expectedInput = this.#sign(tentativeValue, secret);
    const expectedBuffer = Buffer.from(expectedInput);
    const inputBuffer = Buffer.from(input);

    return expectedBuffer.length === inputBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, inputBuffer)
      ? tentativeValue
      : false;
  }
}
