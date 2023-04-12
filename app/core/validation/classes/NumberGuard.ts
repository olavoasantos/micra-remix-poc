import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function NumberGuard<Type extends number>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isNumber({value}) {
    return {
      value,
      valid: typeof value === 'number',
      message: this.message() ?? `Expected number, got ${typeof value}`,
    };
  };

  return guard;
}
