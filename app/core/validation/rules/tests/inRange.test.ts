import {inRange} from '../inRange';
import {number} from '../..';

describe('inRange', () => {
  it('should be valid if a number is in a given range', () => {
    const assert = number(inRange({min: 0, max: 10}));

    expect(assert(5)).toMatchObject({valid: true});
  });

  it('should be invalid if a number is not in a given range', () => {
    const assert = number(inRange({min: 0, max: 10}));

    expect(assert(11)).toMatchObject({valid: false});
  });

  it('should be valid if a number is in a given range including the min and max', () => {
    const assert = number(inRange({min: 0, max: 10, including: true}));

    expect(assert(10)).toMatchObject({valid: true});
    expect(assert(0)).toMatchObject({valid: true});
  });
});
