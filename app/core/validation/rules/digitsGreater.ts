import type {Rule} from '../types';

export interface DigitsGreaterOptions {
  message?: string;
  than: number;
  orEqual?: boolean;
}

export const digitsGreater = <Value extends number>(
  options: DigitsGreaterOptions,
): Rule<Value> => {
  return function digitsGreater({value}) {
    return {
      value,
      valid: options.orEqual
        ? String(value).length >= options.than
        : String(value).length > options.than,
      message:
        options.message ||
        `The attribute must contain more than ${options.than} digits.`,
    };
  };
};
