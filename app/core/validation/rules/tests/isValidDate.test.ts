import {isValidDate} from '../isValidDate';
import {string, date, number} from '../..';

describe('isValidDate', () => {
  it('should be valid if a date is valid', () => {
    const assert = date(isValidDate());

    expect(assert(new Date())).toMatchObject({valid: true});
  });

  it('should be invalid if a date is not valid', () => {
    const assert = date(isValidDate());

    expect(assert(new Date('invalid'))).toMatchObject({valid: false});
  });

  it('should be valid if a string is a valid date', () => {
    const assert = string(isValidDate());

    expect(assert('2020-01-01')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not a valid date', () => {
    const assert = string(isValidDate());

    expect(assert('invalid')).toMatchObject({valid: false});
  });

  it('should be valid if a number is a valid date', () => {
    const assert = number(isValidDate());

    expect(assert(Date.now())).toMatchObject({valid: true});
  });
});
