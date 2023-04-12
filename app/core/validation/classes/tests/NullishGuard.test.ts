import {NullishGuard} from '../NullishGuard';

describe('NullishGuard', () => {
  it('should return a valid result when the value is null or undefined', () => {
    const AssertNullish = NullishGuard();
    const nullResult = AssertNullish(null);
    expect(nullResult.valid).toBe(true);
    expect(nullResult.value).toEqual(null);
    const undefinedResult = AssertNullish(undefined);
    expect(undefinedResult.valid).toBe(true);
    expect(undefinedResult.value).toEqual(undefined);
  });

  it('should return an invalid result when the value is not null or undefined', () => {
    const AssertNullish = NullishGuard();
    const result = AssertNullish('test');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('test');
    expect(result.error).toBeDefined();
  });
});
