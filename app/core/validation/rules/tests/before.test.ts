import {before} from '../before';
import {date} from '../..';

describe('before', () => {
  it('should return true for date values before a given date', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const assert = date(before({date: today}));

    expect(assert(yesterday)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values equal to a given date', () => {
    const today = new Date();

    const assert = date(before({date: today}));

    expect(assert(today)).toMatchObject({
      valid: false,
    });
  });

  it('should return true for date values equal to a given date if orEqual is true', () => {
    const today = new Date();

    const assert = date(before({date: today, orEqual: true}));

    expect(assert(today)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values after a given date', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(before({date: today}));

    expect(assert(tomorrow)).toMatchObject({
      valid: false,
    });
  });
});
