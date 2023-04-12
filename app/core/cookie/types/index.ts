export interface CookieAttributeHandler {
  check(key: string): boolean;
  setValue(cookie: Micra.Cookie, value: string): Micra.Cookie;
}
