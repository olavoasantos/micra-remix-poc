import {NullGuard} from '../NullGuard';

describe('NullGuard', () => {
  it('should return a valid result when the value is null', () => {
    const AssertNull = NullGuard();
    const result = AssertNull(null);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(null);
  });

  it('should return an invalid result when the value is not null', () => {
    const AssertNull = NullGuard();
    const result = AssertNull('test');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('test');
    expect(result.error).toBeDefined();
  });
});
