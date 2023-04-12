import type {
  TypeGuardContext,
  TypeGuardResult,
  RuleResult,
  Rule,
} from '../types';
import {ValidationError} from '../errors/ValidationError';
import {isGuard} from '../guards/isGuard';

export function verify<T>(context: TypeGuardContext<T>): TypeGuardResult<T> {
  const error = new ValidationError();
  for (const rule of context.rules) {
    let result: RuleResult<T> | TypeGuardResult<T>;

    if (isGuard(rule)) {
      result = (rule as any)(context.value, context);
      if (!result.valid) {
        error.list = error.list.concat((result as any).error.list);
        continue;
      }
    } else {
      result = (rule as Rule<T>)(context);
      if (!result.valid) {
        error.push({detail: result.message});
        continue;
      }

      context.value = result.value;
    }

    context.value = result.value;
  }

  return (
    error.list.length > 0
      ? {valid: false, value: context.value, error}
      : {valid: true, value: context.value}
  ) as TypeGuardResult<T>;
}
