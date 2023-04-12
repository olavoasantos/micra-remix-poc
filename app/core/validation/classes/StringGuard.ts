import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function StringGuard<Type extends string>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isString({value}) {
    return {
      value,
      valid: typeof value === 'string',
      message: this.message() ?? `Expected string, got ${typeof value}`,
    };
  };

  return guard;
}
