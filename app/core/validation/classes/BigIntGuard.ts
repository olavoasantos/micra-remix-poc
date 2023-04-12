import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function BigIntGuard<Type extends bigint>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isBigInt({value}) {
    return {
      value,
      valid: typeof value === 'bigint',
      message: this.message() ?? `Expected bigint, got ${typeof value}`,
    };
  };

  return guard;
}
