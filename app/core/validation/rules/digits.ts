import type {Rule} from '../types';

export interface DigitsOptions {
  message?: string;
  length: number;
}

export const digits = <Value extends number>(
  options: DigitsOptions,
): Rule<Value> => {
  return function digits({value}) {
    return {
      value,
      valid: String(value).length === options.length,
      message:
        options.message ||
        `The attribute must contain ${options.length} digits.`,
    };
  };
};
