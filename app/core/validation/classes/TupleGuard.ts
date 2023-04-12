import type {Checkable, ToMutableArray, TypeGuard} from '../types';
import {ValidationError} from '../errors/ValidationError';
import {typeGuard} from '../utilities/typeGuard';
import {verify} from '../utilities/verify';

export function TupleGuard<Value extends Array<any> | ReadonlyArray<any>>(
  structure: {[Key in keyof Value]: TypeGuard<Value[Key]>},
  rules: Checkable<Array<any>>[] = [],
) {
  const guard = typeGuard<ToMutableArray<Value>>(
    [],
    function tupleGuard(context) {
      const preResults = verify({...context, rules: rules as any});
      if (!preResults.valid) {
        return preResults;
      }

      const error = new ValidationError();
      const final = [] as unknown as ToMutableArray<Value>;
      for (const [key, rule] of Object.entries(structure)) {
        const path = context.path ? `${context.path}.${key}` : key;
        const result = verify({
          value: context.value[key as any],
          context,
          path,
          rules: [rule as any],
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
                      path: err.extras.path
                        ? `${path}.${err.extras.path}`
                        : path,
                    },
            })),
          );
          continue;
        }

        final.push(result.value);
      }

      return error.list.length > 0
        ? {valid: false, value: final, error}
        : {valid: true, value: final, error: undefined};
    },
  );

  guard.check = function isArray({value}) {
    return {
      value,
      valid: Array.isArray(value),
      message: this.message() ?? `Expected array, got ${typeof value}`,
    };
  };

  return guard;
}
