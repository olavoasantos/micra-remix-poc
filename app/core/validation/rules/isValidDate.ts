import type {RuleResult, TypeGuardContext} from '../types';

export interface IsValidDateOptions {
  message?: string;
}

export function isValidDate(options: IsValidDateOptions = {}) {
  return function isValidDate<Value extends string | number | Date>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    let valid = false;
    if (value instanceof Date) {
      valid =
        !isNaN(value.getFullYear()) &&
        !isNaN(value.getMonth()) &&
        !isNaN(value.getDate());
    } else if (typeof value === 'string' && isNaN(Date.parse(value))) {
      valid = false;
    } else {
      const date = new Date(value);
      valid =
        !isNaN(date.getFullYear()) &&
        !isNaN(date.getMonth()) &&
        !isNaN(date.getDate());
    }

    return {
      value,
      valid,
      message: options.message || 'The attribute must be a valid date.',
    };
  };
}
