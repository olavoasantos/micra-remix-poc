import type {Rule} from '../types';

export interface DateFormatOptions {
  message?: string;
  format: string;
}

export const dateFormat = <Value extends string>(
  options: DateFormatOptions,
): Rule<Value> => {
  const pattern = new RegExp(
    `^${options.format
      .replace('ss', '([0-5][0-9])')
      .replace('mm', '([0-5][0-9])')
      .replace('MM', '(0[1-9]|1[0-2])')
      .replace('HH', '([0-1][0-9]|2[0-3])')
      .replace('DD', '(0[1-9]|1[0-9]|2[0-9]|3[0-1])')
      .replace('YYYY', '(20[0-9][0-9]|1[8-9][0-9][0-9])')}$`,
  );
  return function dateFormat({value}) {
    return {
      value,
      valid: pattern.test(value),
      message:
        options.message ||
        `The value must be a valid date in the format ${options.format}`,
    };
  };
};
