import {different} from '../different';
import {record, string} from '../..';

describe('different', () => {
  it('should be valid if a given value is different than the value at the given path', () => {
    const assert = record({
      foo: string(different({than: 'bar'})),
      bar: string(),
    });

    expect(assert({foo: 'foo', bar: 'bar'})).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a given value is the same as the value at the given path', () => {
    const assert = record({
      foo: string(different({than: 'bar'})),
      bar: string(),
    });

    expect(assert({foo: 'foo', bar: 'foo'})).toMatchObject({
      valid: false,
    });
  });
});
