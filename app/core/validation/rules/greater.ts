import type {Rule} from '../types';

export interface GreaterOptions {
  message?: string;
  orEqual?: boolean;
  than: number;
}

export const greater = <Value extends number>(
  options: GreaterOptions,
): Rule<Value> => {
  return function greater({value}) {
    return {
      value,
      valid: options.orEqual ? value >= options.than : value > options.than,
      message:
        options.message || options.orEqual
          ? `The attribute must be greater than or equal to ${options.than}.`
          : `The attribute must be greater than ${options.than}.`,
    };
  };
};
