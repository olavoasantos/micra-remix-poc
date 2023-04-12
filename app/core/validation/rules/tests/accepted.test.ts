import {accepted} from '../accepted';
import {boolean, string, number} from '../..';

describe('accepted', () => {
  it('should return true for boolean values', () => {
    const assert = boolean(accepted());
    expect(assert(true)).toMatchObject({
      value: true,
      valid: true,
    });
    expect(assert(false)).toMatchObject({
      value: false,
      valid: false,
    });
  });

  it('should return true for string values', () => {
    const assert = string(accepted());
    expect(assert('yes')).toMatchObject({
      value: 'yes',
      valid: true,
    });
    expect(assert('on')).toMatchObject({
      value: 'on',
      valid: true,
    });
    expect(assert('no')).toMatchObject({
      value: 'no',
      valid: false,
    });
    expect(assert('off')).toMatchObject({
      value: 'off',
      valid: false,
    });
  });

  it('should return true for number values', () => {
    const assert = number(accepted());
    expect(assert(1)).toMatchObject({
      value: 1,
      valid: true,
    });
    expect(assert(0)).toMatchObject({
      value: 0,
      valid: false,
    });
  });
});
