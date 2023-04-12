import type {Rule} from '../types';

export interface LowerOptions {
  message?: string;
  than: number;
  orEqual?: boolean;
}

export const lower = <Value extends number>(
  options: LowerOptions,
): Rule<Value> => {
  return function lower({value}) {
    return {
      value,
      valid: options.orEqual ? value <= options.than : value < options.than,
      message:
        options.message || options.orEqual
          ? `The attribute must be lower than or equal to ${options.than}.`
          : `The attribute must be lower than ${options.than}.`,
    };
  };
};
