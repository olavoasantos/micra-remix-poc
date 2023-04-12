import {after} from '../after';
import {date} from '../..';

describe('after', () => {
  it('should return true for date values after a given date', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(after({date: today}));

    expect(assert(tomorrow)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values equal to a given date', () => {
    const today = new Date();

    const assert = date(after({date: today}));

    expect(assert(today)).toMatchObject({
      valid: false,
    });
  });

  it('should return true for date values equal to a given date if orEqual is true', () => {
    const today = new Date();

    const assert = date(after({date: today, orEqual: true}));

    expect(assert(today)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values before a given date', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const assert = date(after({date: today}));

    expect(assert(yesterday)).toMatchObject({
      valid: false,
    });
  });
});
