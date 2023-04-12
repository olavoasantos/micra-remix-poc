import {isRequired} from '~/core/validation/rules/isRequired';
import {NumberGuard} from '../NumberGuard';
import {RecordGuard} from '../RecordGuard';
import {StringGuard} from '../StringGuard';
import {TupleGuard} from '../TupleGuard';

describe('TupleGuard', () => {
  it('should return a valid result when the value is a tuple', () => {
    const AssertTuple = TupleGuard([StringGuard(), NumberGuard()] as const);
    const result = AssertTuple(['test', 123]);
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(['test', 123]);
  });

  it('should return an invalid result when the value is not a tuple', () => {
    const AssertTuple = TupleGuard([StringGuard(), NumberGuard()] as const);
    const result = AssertTuple(['test', '123']);
    expect(result.valid).toBe(false);
    expect(result.value).toEqual(['test']);
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertTuple = TupleGuard<[string, number]>([
      StringGuard(isRequired()),
      NumberGuard(isRequired()),
    ]);
    expect(AssertTuple(['test', 123]).valid).toBe(true);
    expect(AssertTuple(['test', null]).valid).toBe(false);
    expect(AssertTuple(['test', '123']).valid).toBe(false);
  });

  it('should accept nested records', () => {
    const AssertTuple = TupleGuard([
      StringGuard(),
      RecordGuard({
        name: StringGuard(),
        address: RecordGuard({
          street: StringGuard(),
          city: StringGuard(),
        }),
      }),
    ] as const);
    const result = AssertTuple([
      'test',
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
      'test',
      {
        name: 'test',
        address: {
          street: '123 Main St',
          city: 'Anytown',
        },
      },
    ]);
  });
});
