import type {Rule} from '../types';

export interface AfterOptions {
  message?: string;
  date: Date | string | number;
  orEqual?: boolean;
}

export const after = <Value extends Date>(
  options: AfterOptions,
): Rule<Value> => {
  const referenceDate = new Date(options.date);
  return function after({value}) {
    return {
      value,
      valid: options.orEqual ? value >= referenceDate : value > referenceDate,
      message:
        options.message || `The attribute must be after ${referenceDate}.`,
    };
  };
};
