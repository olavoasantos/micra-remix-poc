import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function DateGuard<Type extends Date>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isDate({value}) {
    return {
      value,
      valid: value instanceof Date,
      message: this.message() ?? `Expected Date, got ${typeof value}`,
    };
  };

  return guard;
}
