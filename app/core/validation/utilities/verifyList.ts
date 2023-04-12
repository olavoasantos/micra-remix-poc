import type {Checkable, TypeGuardContext, TypeGuardResult} from '../types';
import {verify} from './verify';
import {ValidationError} from '../errors/ValidationError';

export function verifyList<Value>(
  structure: Checkable<Value>,
  context: TypeGuardContext<Value[]>,
): TypeGuardResult<Value[]> {
  const final = [] as Value[];
  const error = new ValidationError();
  for (const [key, value] of Object.entries(context.value)) {
    const path = context.path ? `${context.path}.${key}` : key;
    const result = verify<Value>({
      value,
      context,
      path,
      rules: [structure],
    });
    if (result.error) {
      error.list = error.list.concat(
        result.error.list.map((err) => ({
          ...err,
          extras:
            err.extras == null
              ? {key, path}
              : {
                  ...err.extras,
                  path: err.extras.path ? `${path}.${err.extras.path}` : path,
                },
        })),
      );
      continue;
    }

    final.push(result.value);
  }

  return (
    error.list.length > 0
      ? {valid: false, value: final, error}
      : {valid: true, value: final}
  ) as TypeGuardResult<Value[]>;
}
