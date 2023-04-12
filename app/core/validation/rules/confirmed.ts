import type {Rule} from '../types';
import {get, getTopContext} from './utilities';

export interface ConfirmedOptions {
  message?: string;
  by?: string;
}

export const confirmed = (options: ConfirmedOptions = {}): Rule<any> =>
  function confirmed(ctx) {
    const {value, context} = ctx;
    const key = context?.path?.split('.').pop() ?? '';
    const message =
      options.message ||
      `The attribute ${key} must be confirmed.`.replace(/\s+/g, ' ');

    if (!context) {
      return {
        value,
        message,
        valid: false,
      };
    }

    const topContext = getTopContext(context);

    try {
      return {
        value,
        message,
        valid:
          get(topContext.value, options.by ?? '') === value ||
          get(topContext.value, `${key}Confirmation`) === value ||
          get(topContext.value, `${key}_confirmation`) === value,
      };
    } catch (error) {
      return {
        value,
        message,
        valid: false,
      };
    }
  };
