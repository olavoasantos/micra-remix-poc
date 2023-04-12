import type {RuleResult, TypeGuardContext} from '../types';

export interface LengthGreaterOptions {
  message?: string;
  than: number;
  orEqual?: boolean;
}

export function lengthGreater(options: LengthGreaterOptions) {
  return function lengthGreater<Value extends string | Array<any>>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: options.orEqual
        ? value.length >= options.than
        : value.length > options.than,
      message:
        options.message || typeof value === 'string'
          ? `The attribute must be greater than ${options.than} characters long.`
          : `The attribute must have more than ${options.than} items.`,
    };
  };
}
