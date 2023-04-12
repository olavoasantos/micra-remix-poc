/* eslint-disable no-restricted-globals */
import {SAME_SITE_VALUES} from '../constants';
import type {CookieAttributeHandler} from '../types';

export const attributeHandlers: CookieAttributeHandler[] = [
  {
    check(key) {
      return key.toLowerCase() === 'path';
    },
    setValue(cookie, value) {
      return {
        ...cookie,
        path: value,
      };
    },
  },
  {
    check(key) {
      return key.toLowerCase() === 'secure';
    },
    setValue(cookie) {
      return {
        ...cookie,
        secure: true,
      };
    },
  },
  {
    check(key) {
      return key.toLowerCase() === 'domain';
    },
    setValue(cookie, value) {
      return {
        ...cookie,
        domain: value,
      };
    },
  },
  {
    check(key) {
      return key.toLowerCase() === 'httponly';
    },
    setValue(cookie) {
      return {
        ...cookie,
        httpOnly: true,
      };
    },
  },
  {
    check(key) {
      return key.toLowerCase() === 'max-age';
    },
    setValue(cookie, value) {
      if (isNaN(Number(value)) || !isFinite(Number(value))) {
        throw TypeError('Invalid max age cookie attribute');
      }

      return {
        ...cookie,
        maxAge: Number(value),
      };
    },
  },
  {
    check(key) {
      return key.toLowerCase() === 'expires';
    },
    setValue(cookie, value) {
      return {
        ...cookie,
        expires: new Date(value),
      };
    },
  },
  {
    check(key) {
      return key.toLowerCase() === 'samesite';
    },
    setValue(cookie, value) {
      if (
        !SAME_SITE_VALUES.includes(value.toLowerCase() as Micra.CookieSameSite)
      ) {
        return cookie;
      }

      return {
        ...cookie,
        sameSite: value.toLowerCase() as Micra.CookieSameSite,
      };
    },
  },
];
