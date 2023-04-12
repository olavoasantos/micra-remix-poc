/* eslint-disable @typescript-eslint/no-empty-function */
import {isRequired} from '~/core/validation/rules/isRequired';
import {FunctionGuard} from '../FunctionGuard';

describe('FunctionGuard', () => {
  it('should return a valid result when the value is a function', () => {
    const AssertFunction = FunctionGuard();
    const result = AssertFunction(() => {});
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(expect.any(Function));
  });

  it('should return an invalid result when the value is not a function', () => {
    const AssertFunction = FunctionGuard();
    const result = AssertFunction('test');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('test');
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertFunction = FunctionGuard(isRequired());
    expect(AssertFunction(() => {}).valid).toBe(true);
    expect(AssertFunction(null).valid).toBe(false);
  });
});
