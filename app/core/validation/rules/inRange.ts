import type {Rule} from '../types';

export interface InRangeOptions {
  message?: string;
  including?: boolean;
  min: number;
  max: number;
}

export const inRange = <Value extends number>(
  options: InRangeOptions,
): Rule<Value> => {
  return function inRange({value}) {
    return {
      value,
      valid: options.including
        ? value >= options.min && value <= options.max
        : value > options.min && value < options.max,
      message:
        options.message ||
        `The attribute must be between ${options.min} and ${options.max}.`,
    };
  };
};
