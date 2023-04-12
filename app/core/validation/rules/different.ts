import type {Rule} from '../types';
import {get, getTopContext} from './utilities';

export interface DifferentOptions {
  message?: string;
  than: string;
}

export const different = (options: DifferentOptions): Rule => {
  return function different({value, context}) {
    const topContext = getTopContext(context!);

    return {
      value,
      valid:
        JSON.stringify(value) !==
        JSON.stringify(get(topContext.value, options.than)),
      message:
        options.message || `The value must be different than ${options.than}`,
    };
  };
};
