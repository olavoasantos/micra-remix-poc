import type {RuleResult, TypeGuardContext} from '../types';

export interface AcceptedOptions {
  message?: string;
}

export function accepted(options: AcceptedOptions = {}) {
  return function accepted<Value extends boolean | string | number>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: value === true || value === 1 || value === 'on' || value === 'yes',
      message: options.message ?? 'The attribute must be accepted.',
    };
  };
}
