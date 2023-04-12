import type {Rule} from '../types';

export interface AlphaOptions {
  message?: string;
  and?: ('numbers' | 'dashes' | 'spaces' | 'underscores')[];
}

export const alpha = <Value extends string>(
  options: AlphaOptions = {},
): Rule<Value> => {
  const acceptedValues = ['alpha'];
  const pattern = (options.and ?? []).reduce((rgx: string, extension) => {
    if (extension === 'numbers') {
      acceptedValues.push(extension);
      return rgx + '0-9';
    }

    if (extension === 'dashes') {
      acceptedValues.push(extension);
      return rgx + '_\\-';
    }

    if (extension === 'spaces') {
      acceptedValues.push(extension);
      return rgx + '\\s';
    }

    if (extension === 'underscores') {
      acceptedValues.push(extension);
      return rgx + '_';
    }

    return rgx;
  }, 'a-zA-Z');

  const messageValues =
    acceptedValues.slice(0, -1).join(', ') + ' and ' + acceptedValues.slice(-1);
  return function alpha({value}) {
    return {
      value,
      valid: new RegExp(`^[${pattern}]+$`).test(value),
      message:
        options.message ?? `The attribute must only contain ${messageValues}.`,
    };
  };
};
