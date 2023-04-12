import type {Rule} from '../types';
import {getTopContext} from './utilities';
import {get} from './utilities';

export interface InArrayOptions {
  message?: string;
  path: string;
}

export const inArray = (options: InArrayOptions): Rule => {
  return function inArray({value, context}) {
    const topContext = getTopContext(context!);
    const arr = get(topContext.value, options.path);

    if (!Array.isArray(arr)) {
      return {
        value,
        valid: false,
        message: `The attribute in path ${options.path} is not an array.`,
      };
    }

    return {
      value,
      valid: arr.includes(value),
      message:
        options.message ||
        `The attribute must be one of the following: ${arr.join(', ')}.`,
    };
  };
};
