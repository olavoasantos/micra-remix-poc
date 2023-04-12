import type {Rule} from '../types';

export interface BeforeOptions {
  message?: string;
  date: Date | string | number;
  orEqual?: boolean;
}

export const before = <Value extends Date>(
  options: BeforeOptions,
): Rule<Value> => {
  const referenceDate = new Date(options.date);
  return function before({value}) {
    return {
      value,
      valid: options.orEqual ? value <= referenceDate : value < referenceDate,
      message:
        options.message || `The attribute must be before ${referenceDate}.`,
    };
  };
};
