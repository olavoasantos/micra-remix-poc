import type {Checkable, TypeGuard, TypeGuardContext, Verifier} from '../types';
import {ValidationError} from '../errors/ValidationError';
import {GUARD_SYMBOL} from '../constants/symbols';
import {verify} from './verify';

export function typeGuard<Value>(
  rules: Checkable<Value>[],
  verifier: Verifier<Value> = verify,
) {
  const guard = function (value: Value, parent?: TypeGuardContext<Value>) {
    const context = {
      value,
      context: parent,
      rules,
    };

    if (guard.check != null) {
      const error = new ValidationError();
      const result = guard.check(context);
      if (!result.valid) {
        error.push({detail: result.message});
        return {valid: false, value, error};
      }
    }

    return verifier(context);
  } as TypeGuard<Value>;

  let message = 'Invalid value';
  guard[GUARD_SYMBOL] = true;
  guard.message = function guardMessage() {
    return message;
  };
  guard.setMessage = function guardSetMessage(msg: string) {
    message = msg;
  };
  guard.extend = function extend(...newRules: Checkable<Value>[]) {
    return typeGuard([...rules, ...newRules]);
  };

  return guard;
}
