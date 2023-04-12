import {digits} from '../digits';
import {number} from '../..';

describe('digits', () => {
  it('should be valid if a given value contains the given number of digits', () => {
    const assert = number(
      digits({
        length: 3,
      }),
    );

    expect(assert(123)).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a given value does not contain the given number of digits', () => {
    const assert = number(
      digits({
        length: 3,
      }),
    );

    expect(assert(12)).toMatchObject({
      valid: false,
    });
  });
});
