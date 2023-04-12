import {betweenDates} from '../betweenDates';
import {date} from '../..';

describe('betweenDates', () => {
  it('should return true for date values between two given dates', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(betweenDates({after: yesterday, before: tomorrow}));

    expect(assert(today)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values equal to the start date', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(betweenDates({after: today, before: tomorrow}));

    expect(assert(today)).toMatchObject({
      valid: false,
    });
  });

  it('should return true for date values equal to the start date if orEqual is true', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(
      betweenDates({orEqual: true, after: today, before: tomorrow}),
    );

    expect(assert(today)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values equal to the end date', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(betweenDates({after: today, before: tomorrow}));

    expect(assert(tomorrow)).toMatchObject({
      valid: false,
    });
  });

  it('should return true for date values equal to the end date if orEqual is true', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(
      betweenDates({orEqual: true, after: today, before: tomorrow}),
    );

    expect(assert(tomorrow)).toMatchObject({
      valid: true,
    });
  });

  it('should return false for date values before the start date', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(betweenDates({after: tomorrow, before: yesterday}));

    expect(assert(today)).toMatchObject({
      valid: false,
    });
  });

  it('should return false for date values after the end date', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assert = date(betweenDates({after: tomorrow, before: yesterday}));

    expect(assert(today)).toMatchObject({
      valid: false,
    });
  });
});
