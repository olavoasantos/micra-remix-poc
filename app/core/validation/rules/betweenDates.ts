import type {Rule} from '../types';

export interface BetweenDatesOptions {
  message?: string;
  after: Date | string | number;
  before: Date | string | number;
  orEqual?: boolean;
}

export const betweenDates = <Value extends Date>(
  options: BetweenDatesOptions,
): Rule<Value> => {
  const afterDate = new Date(options.after);
  const beforeDate = new Date(options.before);
  return function betweenDates({value}) {
    return {
      value,
      valid: options.orEqual
        ? value >= afterDate && value <= beforeDate
        : value > afterDate && value < beforeDate,
      message:
        options.message ||
        `The attribute must be between ${afterDate} and ${beforeDate}.`,
    };
  };
};
