import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function RegExpGuard<Type extends RegExp>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isRegExp({value}) {
    return {
      value,
      valid: value instanceof RegExp,
      message: this.message() ?? `Expected RegExp, got ${typeof value}`,
    };
  };

  return guard;
}
