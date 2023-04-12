import {isRequired} from '../../rules/isRequired';
import {RegExpGuard} from '../RegExpGuard';

describe('RegExpGuard', () => {
  it('should return a valid result when the value is a regexp', () => {
    const AssertRegExp = RegExpGuard();
    const result = AssertRegExp(/test/);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(/test/);
  });

  it('should return an invalid result when the value is not a regexp', () => {
    const AssertRegExp = RegExpGuard();
    const result = AssertRegExp('test');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('test');
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertRegExp = RegExpGuard(isRequired());
    expect(AssertRegExp(/test/).valid).toBe(true);
    expect(AssertRegExp(null).valid).toBe(false);
  });
});
