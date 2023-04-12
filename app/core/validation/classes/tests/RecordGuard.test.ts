import {isRequired} from '../../rules/isRequired';
import {RecordGuard} from '../RecordGuard';
import {StringGuard} from '../StringGuard';

describe('RecordGuard', () => {
  it('should return a valid result when the value is a record', () => {
    const AssertRecord = RecordGuard({
      name: StringGuard(),
    });
    const result = AssertRecord({name: 'test'});
    expect(result.valid).toBe(true);
    expect(result.value).toEqual({name: 'test'});
  });

  it('should return an invalid result when the value is not a record', () => {
    const AssertRecord = RecordGuard({
      name: StringGuard(),
    });
    const result = AssertRecord({name: 123});
    expect(result.valid).toBe(false);
    expect(result.value).toEqual({name: undefined});
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertRecord = RecordGuard({
      name: StringGuard(isRequired()),
    });
    expect(AssertRecord({name: 'test'}).valid).toBe(true);
    expect(AssertRecord({name: ''}).valid).toBe(false);
    expect(AssertRecord({name: null}).valid).toBe(false);
  });

  it('should accept nested records', () => {
    const AssertRecord = RecordGuard({
      name: StringGuard(),
      address: RecordGuard({
        street: StringGuard(),
        city: StringGuard(),
      }),
    });
    const result = AssertRecord({
      name: 'test',
      address: {
        street: '123 Main St',
        city: 'Anytown',
      },
    });
    expect(result.valid).toBe(true);
    expect(result.value).toEqual({
      name: 'test',
      address: {
        street: '123 Main St',
        city: 'Anytown',
      },
    });
  });

  it('should accept nested records with custom rules', () => {
    const AssertRecord = RecordGuard({
      name: StringGuard(),
      address: RecordGuard({
        street: StringGuard(isRequired()),
        city: StringGuard(isRequired()),
      }),
    });
    expect(AssertRecord({name: 'test', address: {}}).valid).toBe(false);
    expect(
      AssertRecord({name: 'test', address: {street: '123 Main St'}}).valid,
    ).toBe(false);
    expect(AssertRecord({name: 'test', address: {city: 'Anytown'}}).valid).toBe(
      false,
    );
    expect(
      AssertRecord({
        name: 'test',
        address: {street: '123 Main St', city: 'Anytown'},
      }).valid,
    ).toBe(true);
  });
});
