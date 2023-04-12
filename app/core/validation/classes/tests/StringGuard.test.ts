import {isRequired} from '../../rules/isRequired';
import {StringGuard} from '../StringGuard';

describe('StringGuard', () => {
  it('should return a valid result when the value is a string', () => {
    const AssertString = StringGuard();
    const result = AssertString('test');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('test');
  });

  it('should return an invalid result when the value is not a string', () => {
    const AssertString = StringGuard();
    const result = AssertString(123);
    expect(result.valid).toBe(false);
    expect(result.value).toBe(123);
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertRequiredString = StringGuard(isRequired());
    expect(AssertRequiredString('test').valid).toBe(true);
    expect(AssertRequiredString('').valid).toBe(false);
    expect(AssertRequiredString(null).valid).toBe(false);
  });

  it('customize the error message', () => {
    const AssertString = StringGuard();
    AssertString.setMessage('This is not a string');

    const result = AssertString(123);
    expect(result.valid).toBe(false);
    expect(result.value).toBe(123);
    expect(result.error).toBeDefined();
    expect(result.error?.serialize()).toMatchObject([
      {
        detail: 'This is not a string',
      },
    ]);
  });

  it('returns the the error message from the rule', () => {
    const message = 'This is not a string';
    const AssertString = StringGuard();
    AssertString.setMessage(message);

    expect(AssertString.message()).toBe(message);
  });

  it('adds extra rules to the guard', () => {
    const AssertString = StringGuard();
    const AssertStringRequired = AssertString.extend(isRequired());

    expect(AssertStringRequired('test').valid).toBe(true);
    expect(AssertStringRequired('').valid).toBe(false);
    expect(AssertStringRequired(null).valid).toBe(false);
    expect(AssertString('test').valid).toBe(true);
    expect(AssertString('').valid).toBe(true);
    expect(AssertString(null).valid).toBe(false);
  });
});
