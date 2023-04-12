import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function UndefinedGuard<Type extends undefined>(
  ...rules: Checkable<Type>[]
) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isUndefined({value}) {
    return {
      value,
      valid: typeof value === 'undefined',
      message: this.message() ?? `Expected undefined, got ${typeof value}`,
    };
  };

  return guard;
}
