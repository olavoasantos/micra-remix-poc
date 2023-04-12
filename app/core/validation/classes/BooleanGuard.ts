import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function BooleanGuard<Type extends boolean>(
  ...rules: Checkable<Type>[]
) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isBoolean({value}) {
    return {
      value,
      valid: typeof value === 'boolean',
      message: this.message() ?? `Expected boolean, got ${typeof value}`,
    };
  };

  return guard;
}
