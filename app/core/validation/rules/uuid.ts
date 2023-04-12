import type {RuleResult, TypeGuardContext} from '../types';

export interface UuidOptions {
  message?: string;
  version?: 1 | 2 | 3 | 4 | 5;
}

const patterns: Record<Required<UuidOptions>['version'], RegExp> = {
  1: /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  2: /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
};

export const uuid = (options: UuidOptions = {}) =>
  function uuid<Value extends string>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    return {
      value,
      valid: patterns[options.version ?? 4].test(value),
      message: options.message ?? 'The attribute must be a valid UUID.',
    };
  };
