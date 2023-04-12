import type {RuleResult, TypeGuardContext} from '../types';

export interface LengthOptions {
  message?: string;
  of: number;
}

export function length(options: LengthOptions) {
  return function length<Value extends string | Array<any>>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: value.length === options.of,
      message:
        options.message || typeof value === 'string'
          ? `The attribute must be ${options.of} characters long.`
          : `The attribute must have ${options.of} items.`,
    };
  };
}
