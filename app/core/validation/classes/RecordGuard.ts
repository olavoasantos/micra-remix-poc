import type {Checkable} from '../types';
import {typeGuard} from '../utilities/typeGuard';
import {verify} from '../utilities/verify';
import {verifyObject} from '../utilities/verifyObject';

export function RecordGuard<Value extends Record<string, any>>(
  structure: {[Key in keyof Value]: Checkable<Value[Key]>},
  rules: Checkable<Value>[] = [],
) {
  const guard = typeGuard<Value>([], function recordGuard(ctx) {
    const preResults = verify<Value>({...ctx, rules: rules as any});

    return preResults.valid
      ? verifyObject<Value>(structure as any, ctx)
      : preResults;
  });

  guard.check = function isRecord({value}) {
    return {
      value,
      valid:
        typeof value === 'object' && !Array.isArray(value) && value != null,
      message: this.message() ?? `Expected object, got ${typeof value}`,
    };
  };

  return guard;
}
