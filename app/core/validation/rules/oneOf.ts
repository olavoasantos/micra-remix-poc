import type {Rule} from '../types';

export interface OneOfOptions<T> {
  message?: string;
  options: T[];
}

export const oneOf = <Value>(options: OneOfOptions<Value>): Rule<Value> =>
  function oneOf({value}) {
    return {
      value,
      valid: options.options.includes(value),
      message:
        options.message ?? `The attribute must be one of ${options.options}.`,
    };
  };
