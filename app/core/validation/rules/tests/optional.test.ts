import {optional} from '../optional';
import {string} from '../..';

describe('optional', () => {
  it('should return a valid result when the value is null or undefined', () => {
    const AssertOptional = optional(string());
    const nullResult = AssertOptional(null);
    expect(nullResult.valid).toBe(true);
    expect(nullResult.value).toEqual(null);
    const undefinedResult = AssertOptional(undefined);
    expect(undefinedResult.valid).toBe(true);
    expect(undefinedResult.value).toEqual(undefined);
  });

  it('should return a valid result when the value is not null or undefined and the guard is valid', () => {
    const AssertOptional = optional(string());
    const result = AssertOptional('test');
    expect(result.valid).toBe(true);
    expect(result.value).toEqual('test');
  });

  it('should return an invalid result when the value is not null or undefined', () => {
    const AssertOptional = optional(string());
    const result = AssertOptional(123);
    expect(result.valid).toBe(false);
    expect(result.value).toEqual(123);
    expect(result.error).toBeDefined();
  });
});
