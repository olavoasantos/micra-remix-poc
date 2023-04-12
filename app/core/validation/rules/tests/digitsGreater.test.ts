import {digitsGreater} from '../digitsGreater';
import {number} from '../..';

describe('digitsGreater', () => {
  it('should be valid if a number is greater than the specified digits', () => {
    const assert = number(digitsGreater({than: 5}));

    expect(assert(123456)).toMatchObject({valid: true});
  });

  it('should be valid if a number is greater or equal the specified digits', () => {
    const assert = number(digitsGreater({than: 5, orEqual: true}));

    expect(assert(123456)).toMatchObject({valid: true});
  });

  it('should be invalid if a number is not greater than the specified digits', () => {
    const assert = number(digitsGreater({than: 5}));

    expect(assert(12345)).toMatchObject({valid: false});
  });
});
