import type {RuleResult, TypeGuardContext} from '../types';

export interface IsRequiredOptions {
  message?: string;
}

export function isRequired(options: IsRequiredOptions = {}) {
  return function isRequired<Value>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: value != null && value !== '',
      message: options.message ?? 'The attribute is required.',
    };
  };
}
