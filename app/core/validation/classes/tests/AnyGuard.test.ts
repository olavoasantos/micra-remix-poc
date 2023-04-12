/* eslint-disable @typescript-eslint/no-empty-function */
import {isRequired} from '../../rules/isRequired';
import {AnyGuard} from '../AnyGuard';
import {RecordGuard} from '../RecordGuard';

describe('AnyGuard', () => {
  it('should return a valid result when the value is anything', () => {
    const AssertAny = AnyGuard();
    expect(AssertAny('test').valid).toBe(true);
    expect(AssertAny(123).valid).toBe(true);
    expect(AssertAny(true).valid).toBe(true);
    expect(AssertAny(null).valid).toBe(true);
    expect(AssertAny(undefined).valid).toBe(true);
    expect(AssertAny(Symbol('test')).valid).toBe(true);
    expect(AssertAny(new Date()).valid).toBe(true);
    expect(AssertAny(BigInt(123)).valid).toBe(true);
    expect(AssertAny(/test/).valid).toBe(true);
    expect(AssertAny(() => {}).valid).toBe(true);
    expect(AssertAny({}).valid).toBe(true);
    expect(AssertAny([]).valid).toBe(true);
  });

  it('should accept record keys with any values', () => {
    const AssertRequiredAny = RecordGuard({test: AnyGuard()});
    expect(AssertRequiredAny({test: 'test'}).valid).toBe(true);
    expect(AssertRequiredAny({test: 123}).valid).toBe(true);
    expect(AssertRequiredAny({test: true}).valid).toBe(true);
  });

  it('should accept custom rules', () => {
    const AssertRequiredAny = AnyGuard(isRequired());
    expect(AssertRequiredAny('test').valid).toBe(true);
    expect(AssertRequiredAny('').valid).toBe(false);
    expect(AssertRequiredAny(null).valid).toBe(false);
  });
});
