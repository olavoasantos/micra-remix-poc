import {UndefinedGuard} from '../UndefinedGuard';

describe('UndefinedGuard', () => {
  it('should return a valid result when the value is undefined', () => {
    const AssertUndefined = UndefinedGuard();
    const result = AssertUndefined(undefined);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(undefined);
  });

  it('should return an invalid result when the value is not undefined', () => {
    const AssertUndefined = UndefinedGuard();
    const result = AssertUndefined('test');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('test');
    expect(result.error).toBeDefined();
  });
});
