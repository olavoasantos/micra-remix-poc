import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function FunctionGuard<
  Type extends (...args: any[]) => any = (...args: any[]) => any,
>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isFunction({value}) {
    return {
      value,
      valid: typeof value === 'function',
      message: this.message() ?? `Expected function, got ${typeof value}`,
    };
  };

  return guard;
}
