import {isRequired} from '../../rules/isRequired';
import {NumberGuard} from '../NumberGuard';

describe('NumberGuard', () => {
  it('should return a valid result when the value is a number', () => {
    const AssertNumber = NumberGuard();
    const result = AssertNumber(123);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(123);
  });

  it('should return an invalid result when the value is not a number', () => {
    const AssertNumber = NumberGuard();
    const result = AssertNumber('123');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('123');
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertNumber = NumberGuard(isRequired());
    expect(AssertNumber(123).valid).toBe(true);
    expect(AssertNumber(0).valid).toBe(true);
    expect(AssertNumber(null).valid).toBe(false);
  });
});
