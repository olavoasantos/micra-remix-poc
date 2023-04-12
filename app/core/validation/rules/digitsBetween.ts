import type {Rule} from '../types';

export interface DigitsBetweenOptions {
  message?: string;
  min: number;
  max: number;
  orEqual?: boolean;
}

export const digitsBetween = <Value extends number>(
  options: DigitsBetweenOptions,
): Rule<Value> => {
  return function digitsBetween({value}) {
    const length = String(value).length;
    return {
      value,
      valid: options.orEqual
        ? length >= options.min && length <= options.max
        : length > options.min && length < options.max,
      message:
        options.message ||
        `The attribute must contain between ${options.min} and ${options.max} digits.`,
    };
  };
};
