import {isRequired} from '../../rules/isRequired';
import {BigIntGuard} from '../BigIntGuard';

describe('BigIntGuard', () => {
  it('should return a valid result when the value is a bigint', () => {
    const AssertBigInt = BigIntGuard();
    const result = AssertBigInt(BigInt(123));
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(BigInt(123));
  });

  it('should return an invalid result when the value is not a bigint', () => {
    const AssertBigInt = BigIntGuard();
    const result = AssertBigInt(123);
    expect(result.valid).toBe(false);
    expect(result.value).toEqual(123);
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertBigInt = BigIntGuard(isRequired());
    expect(AssertBigInt(BigInt(123)).valid).toBe(true);
    expect(AssertBigInt(null).valid).toBe(false);
  });
});
