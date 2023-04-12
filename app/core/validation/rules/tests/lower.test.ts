import {lower} from '../lower';
import {number} from '../..';

describe('lower', () => {
  it('should be valid if a number is lower than the given value', () => {
    const assert = number(lower({than: 10}));

    expect(assert(9)).toMatchObject({valid: true});
    expect(assert(8)).toMatchObject({valid: true});
    expect(assert(7)).toMatchObject({valid: true});
  });

  it('should be invalid if a number is greater than the given value', () => {
    const assert = number(lower({than: 10}));

    expect(assert(11)).toMatchObject({valid: false});
    expect(assert(12)).toMatchObject({valid: false});
    expect(assert(13)).toMatchObject({valid: false});
  });

  it('should be invalid if a number is equal to the given value', () => {
    const assert = number(lower({than: 10}));

    expect(assert(10)).toMatchObject({valid: false});
  });

  it('should be valid if a number is equal to the given value if orEqual is true', () => {
    const assert = number(lower({than: 10, orEqual: true}));

    expect(assert(10)).toMatchObject({valid: true});
  });
});
