import type {RuleResult, TypeGuardContext} from '../types';

export interface LengthBetweenOptions {
  message?: string;
  min: number;
  max: number;
  orEqual?: boolean;
}

export function lengthBetween(options: LengthBetweenOptions) {
  return function lengthBetween<Value extends string | Array<any>>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: options.orEqual
        ? value.length >= options.min && value.length <= options.max
        : value.length > options.min && value.length < options.max,
      message:
        options.message || typeof value === 'string'
          ? `The attribute must be between ${options.min} and ${options.max} characters long.`
          : `The attribute must have between ${options.min} and ${options.max} items.`,
    };
  };
}
