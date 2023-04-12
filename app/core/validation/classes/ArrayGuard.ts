import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';
import {verify} from '../utilities/verify';
import {verifyList} from '../utilities/verifyList';

export function ArrayGuard<Type>(
  structure: Checkable<Type>,
  rules: Checkable<Array<any>>[] = [],
) {
  const guard = typeGuard<Type[]>([], function arrayGuard(context) {
    const preResults = verify<Type[]>({...context, rules: rules});
    return preResults.valid ? verifyList<Type>(structure, context) : preResults;
  });

  guard.check = function isArray({value}) {
    return {
      value,
      valid: Array.isArray(value),
      message: this.message() ?? `Expected array, got ${typeof value}`,
    };
  };

  return guard;
}
