import {isRequired} from '../../rules/isRequired';
import {BooleanGuard} from '../BooleanGuard';

describe('BooleanGuard', () => {
  it('should return a valid result when the value is a boolean', () => {
    const AssertBoolean = BooleanGuard();
    const result = AssertBoolean(true);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(true);
  });

  it('should return an invalid result when the value is not a boolean', () => {
    const AssertBoolean = BooleanGuard();
    const result = AssertBoolean('true');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('true');
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertBoolean = BooleanGuard(isRequired());
    expect(AssertBoolean(true).valid).toBe(true);
    expect(AssertBoolean(false).valid).toBe(true);
    expect(AssertBoolean(null).valid).toBe(false);
  });
});
