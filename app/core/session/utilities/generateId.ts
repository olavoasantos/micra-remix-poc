import {generateRandomString} from './generateRandomString';

export function generateId(prefix = 'id') {
  return [prefix, generateRandomString(), generateRandomString()].join('-');
}
