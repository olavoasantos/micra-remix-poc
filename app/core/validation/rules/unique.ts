import type {RuleResult, TypeGuardContext} from '../types';

export interface UniqueOptions {
  message?: string;
  keys?: string[];
}

export const unique = ({keys, message}: UniqueOptions = {keys: []}) => {
  return function unique<Value extends Array<any>>({
    value,
  }: TypeGuardContext<Value>): RuleResult<Value> {
    let valid = true;
    for (const item of value) {
      if (keys && keys.length > 0) {
        if (
          value.filter((data: any) =>
            keys.some((field) => data[field] === item[field]),
          ).length > 1
        ) {
          valid = false;
          break;
        }
      } else {
        if (value.filter((data: any) => data === item).length > 1) {
          valid = false;
          break;
        }
      }
    }

    return {
      value,
      valid,
      message: message || `The attribute must be unique in the array.`,
    } as RuleResult<Value>;
  };
};
