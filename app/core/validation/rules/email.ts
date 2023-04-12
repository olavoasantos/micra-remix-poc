import type {Rule} from '../types';

export interface EmailOptions {
  message?: string;
}

const pattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email = <Value extends string>(
  options: EmailOptions = {},
): Rule<Value> =>
  function email({value}) {
    return {
      value,
      valid: pattern.test(value),
      message:
        options.message ?? 'The attribute must be a valid email address.',
    };
  };
