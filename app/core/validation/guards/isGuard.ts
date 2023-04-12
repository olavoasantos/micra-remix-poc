import type {TypeGuard} from '../types';
import {GUARD_SYMBOL} from '../constants/symbols';

export function isGuard(value: any): value is TypeGuard<any> {
  return typeof value === 'function' && value[GUARD_SYMBOL] === true;
}
