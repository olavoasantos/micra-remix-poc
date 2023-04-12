import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function NullGuard<Type extends null>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isNull({value}) {
    return {
      value,
      valid: value === null,
      message: this.message() ?? `Expected null, got ${typeof value}`,
    };
  };

  return guard;
}
