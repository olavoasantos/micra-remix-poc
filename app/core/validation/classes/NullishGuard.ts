import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function NullishGuard<Type extends null | undefined>(
  ...rules: Checkable<Type>[]
) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isNullish({value}) {
    return {
      value,
      valid: value == null,
      message:
        this.message() ?? `Expected null or undefined, got ${typeof value}`,
    };
  };

  return guard;
}
