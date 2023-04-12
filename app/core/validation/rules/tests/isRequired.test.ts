import {isRequired} from '../isRequired';
import {string, record} from '../..';

describe('isRequired', () => {
  it('should be valid if a string is not empty', () => {
    const assert = string(isRequired());

    expect(assert('hello')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is empty', () => {
    const assert = string(isRequired());

    expect(assert('')).toMatchObject({valid: false});
  });

  it('should be invalid if a string is null', () => {
    const assert = string(isRequired());

    expect(assert(null)).toMatchObject({valid: false});
  });

  it('should be invalid if a string is undefined', () => {
    const assert = string(isRequired());

    expect(assert(undefined)).toMatchObject({valid: false});
  });

  it('should be valid if a record is not empty', () => {
    const assert = record({
      name: string(isRequired()),
    });

    expect(
      assert({
        name: 'John',
      }),
    ).toMatchObject({valid: true});
  });

  it('should be invalid if a record is empty', () => {
    const assert = record({
      name: string(isRequired()),
    });

    expect(
      assert({
        name: '',
      }),
    ).toMatchObject({valid: false});
  });
});
