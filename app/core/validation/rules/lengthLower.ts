import type {RuleResult, TypeGuardContext} from '../types';

export interface LengthLowerOptions {
  message?: string;
  than: number;
  orEqual?: boolean;
}

export function lengthLower(options: LengthLowerOptions) {
  return function lengthLower<Value extends string | Array<any>>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: options.orEqual
        ? value.length <= options.than
        : value.length < options.than,
      message:
        options.message || typeof value === 'string'
          ? `The attribute must be lower than ${options.than} characters long.`
          : `The attribute must have less than ${options.than} items.`,
    };
  };
}
