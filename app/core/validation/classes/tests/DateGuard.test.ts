import {isRequired} from '../../rules/isRequired';
import {DateGuard} from '../DateGuard';

describe('DateGuard', () => {
  it('should return a valid result when the value is a date', () => {
    const AssertDate = DateGuard();
    const date = new Date();
    const result = AssertDate(date);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(date);
  });

  it('should return an invalid result when the value is not a date', () => {
    const AssertDate = DateGuard();
    const result = AssertDate('2019-01-01');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('2019-01-01');
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertDate = DateGuard(isRequired());
    expect(AssertDate(new Date()).valid).toBe(true);
    expect(AssertDate(null).valid).toBe(false);
  });
});
