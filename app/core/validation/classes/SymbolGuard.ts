import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function SymbolGuard<Type extends symbol>(...rules: Checkable<Type>[]) {
  const guard = typeGuard<Type>(rules);

  guard.check = function isSymbol({value}) {
    return {
      value,
      valid: typeof value === 'symbol',
      message: this.message() ?? `Expected symbol, got ${typeof value}`,
    };
  };

  return guard;
}
