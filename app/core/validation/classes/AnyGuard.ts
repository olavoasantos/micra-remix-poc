import type {Checkable, TypeGuard} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function AnyGuard<Type = any>(
  ...rules: Checkable<Type>[]
): TypeGuard<Type> {
  const guard = typeGuard<Type>(rules);

  guard.check = function isAny({value}) {
    return {
      value,
      valid: true,
      message: this.message() ?? `Expected any, got ${typeof value}`,
    };
  };

  return guard;
}
