import {digitsBetween} from '../digitsBetween';
import {number} from '../..';

describe('digitsBetween', () => {
  it('should be valid if a number contains the given number of digits between min and max values', () => {
    const assert = number(
      digitsBetween({
        min: 3,
        max: 5,
      }),
    );

    expect(assert(1234)).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a number contains more digits than the max value', () => {
    const assert = number(
      digitsBetween({
        min: 3,
        max: 5,
      }),
    );

    expect(assert(123456)).toMatchObject({
      valid: false,
    });
  });

  it('should be invalid if a number contains less digits than the min value', () => {
    const assert = number(
      digitsBetween({
        min: 3,
        max: 5,
      }),
    );

    expect(assert(12)).toMatchObject({
      valid: false,
    });
  });

  it('should be invalid if a number contains the same number of digits as the min value', () => {
    const assert = number(
      digitsBetween({
        min: 3,
        max: 5,
      }),
    );

    expect(assert(123)).toMatchObject({
      valid: false,
    });
  });

  it('should be valid if a number contains the same number of digits as the min value is orEqual is true', () => {
    const assert = number(
      digitsBetween({
        orEqual: true,
        min: 3,
        max: 5,
      }),
    );

    expect(assert(123)).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a number contains the same number of digits as the max value', () => {
    const assert = number(
      digitsBetween({
        min: 3,
        max: 5,
      }),
    );

    expect(assert(12345)).toMatchObject({
      valid: false,
    });
  });

  it('should be valid if a number contains the same number of digits as the max value is orEqual is true', () => {
    const assert = number(
      digitsBetween({
        orEqual: true,
        min: 3,
        max: 5,
      }),
    );

    expect(assert(12345)).toMatchObject({
      valid: true,
    });
  });
});
