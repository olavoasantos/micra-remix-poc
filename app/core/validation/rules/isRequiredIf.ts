import {ValidationError} from '../errors/ValidationError';
import {typeGuard} from '../utilities/typeGuard';
import type {TypeGuard} from '../types';
import {get, getTopContext} from './utilities';

export interface IsRequiredIfOptions {
  message?: string;
  field: string;
  value?: any;
}

export function isRequiredIf<Type>(
  options: IsRequiredIfOptions,
  rule: TypeGuard<Type>,
) {
  const guard = typeGuard<Type | undefined>(
    [],
    function requiredIfGuard(context) {
      const error = new ValidationError();
      const key = context?.path?.split('.').pop() ?? '';
      const message =
        options.message ||
        `The ${key} field is required when ${options.field} is ${
          options.value ?? 'set'
        }.`;

      const topContext = getTopContext(context);
      const valueFromPath = get(topContext.value, options.field);

      let valid = true;
      if (
        ('value' in options && valueFromPath === options.value) ||
        (!('value' in options) && Boolean(valueFromPath))
      ) {
        valid = context.value != null && context.value !== '';
        if (!valid) {
          error.push({detail: message});
        }
      }

      if (valid && context.value != null) {
        return (rule as any)(context.value, context.context);
      }

      return {
        valid,
        value: context.value!,
        error: valid ? undefined : error,
      };
    },
  );

  return guard;
}
