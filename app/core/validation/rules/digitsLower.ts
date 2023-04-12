import type {Rule} from '../types';

export interface DigitsLowerOptions {
  message?: string;
  than: number;
  orEqual?: boolean;
}

export const digitsLower = <Value extends number>(
  options: DigitsLowerOptions,
): Rule<Value> => {
  return function digitsLower({value}) {
    return {
      value,
      valid: options.orEqual
        ? String(value).length <= options.than
        : String(value).length < options.than,
      message:
        options.message ||
        `The attribute must contain less than ${options.than} digits.`,
    };
  };
};
