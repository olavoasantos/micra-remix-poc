import type {Checkable, TypeGuardContext, TypeGuardResult} from '../types';
import {verify} from './verify';
import {ValidationError} from '../errors/ValidationError';

export function verifyObject<Value>(
  structure: {[Key in keyof Value]: Checkable<Value[Key]>},
  context: TypeGuardContext<Value>,
): TypeGuardResult<Value> {
  const final = {} as Value;
  const error = new ValidationError();
  for (const [key, rule] of Object.entries(structure)) {
    const path = context.path ? `${context.path}.${key}` : key;
    const result = verify<Value[keyof Value]>({
      context,
      path,
      value: context.value[key as keyof Value],
      rules: [rule as Checkable<Value[keyof Value]>],
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

    final[key as keyof Value] = result.value;
  }

  return (
    error.list.length > 0
      ? {valid: false, value: final, error}
      : {valid: true, value: final}
  ) as TypeGuardResult<Value>;
}
