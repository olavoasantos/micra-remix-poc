import {isRequired} from '../../rules/isRequired';
import {ArrayGuard} from '../ArrayGuard';
import {RecordGuard} from '../RecordGuard';
import {StringGuard} from '../StringGuard';

describe('ArrayGuard', () => {
  it('should return a valid result when the value is an array', () => {
    const AssertArray = ArrayGuard(StringGuard());
    const result = AssertArray(['test']);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(['test']);
  });

  it('should return an invalid result when the value is not an array', () => {
    const AssertArray = ArrayGuard(StringGuard());
    const result = AssertArray({name: 123});
    expect(result.valid).toBe(false);
    expect(result.value).toEqual({name: 123});
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertArray = ArrayGuard(StringGuard(isRequired()));
    expect(AssertArray(['test']).valid).toBe(true);
    expect(AssertArray(['test', '']).valid).toBe(false);
    expect(AssertArray(['test', null]).valid).toBe(false);
  });

  it('should accept nested records', () => {
    const AssertArray = ArrayGuard(
      RecordGuard({
        name: StringGuard(),
        address: RecordGuard({
          street: StringGuard(),
          city: StringGuard(),
        }),
      }),
    );
    const result = AssertArray([
      {
        name: 'test',
        address: {
          street: '123 Main St',
          city: 'Anytown',
        },
      },
    ]);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual([
      {
        name: 'test',
        address: {
          street: '123 Main St',
          city: 'Anytown',
        },
      },
    ]);
  });

  it('should accept nested records with custom rules', () => {
    const AssertArray = ArrayGuard(
      RecordGuard({
        name: StringGuard(),
        address: RecordGuard({
          street: StringGuard(isRequired()),
          city: StringGuard(isRequired()),
        }),
      }),
    );
    expect(AssertArray([{name: 'test', address: {}}]).valid).toBe(false);
    expect(
      AssertArray([{name: 'test', address: {street: '123 Main St'}}]).valid,
    ).toBe(false);
    expect(
      AssertArray([{name: 'test', address: {city: 'Anytown'}}]).valid,
    ).toBe(false);
    expect(
      AssertArray([
        {
          name: 'test',
          address: {street: '123 Main St', city: 'Anytown'},
        },
      ]).valid,
    ).toBe(true);
  });
});
