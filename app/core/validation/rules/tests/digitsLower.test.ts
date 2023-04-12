import {digitsLower} from '../digitsLower';
import {number} from '../..';

describe('digitsLower', () => {
  it('should be valid if a number is lower than the specified digits', () => {
    const assert = number(digitsLower({than: 5}));

    expect(assert(1234)).toMatchObject({valid: true});
  });

  it('should be valid if a number is lower or equal the specified digits', () => {
    const assert = number(digitsLower({than: 5, orEqual: true}));

    expect(assert(12345)).toMatchObject({valid: true});
  });

  it('should be invalid if a number is not lower than the specified digits', () => {
    const assert = number(digitsLower({than: 5}));

    expect(assert(123456)).toMatchObject({valid: false});
  });
});
