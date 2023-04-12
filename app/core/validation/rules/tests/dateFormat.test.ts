import {dateFormat} from '../dateFormat';
import {string} from '../..';

describe('dateFormat', () => {
  it('should be valid if a given value is a valid date', () => {
    const assert = string(dateFormat({format: 'YYYY-MM-DD'}));

    expect(assert('2020-01-01')).toMatchObject({
      valid: true,
    });
  });

  it('should match custom date format', () => {
    const assert = string(dateFormat({format: 'MM/DD/YYYY'}));

    expect(assert('01/01/2020')).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a given value is not a valid date', () => {
    const assert = string(dateFormat({format: 'YYYY-MM-DD'}));

    expect(assert('2020-01-32')).toMatchObject({
      valid: false,
    });
  });

  it('should match a custom error message', () => {
    const assert = string(
      dateFormat({
        format: 'YYYY-MM-DD',
        message: 'This is a custom error message',
      }),
    );

    expect(assert('2020-01-32').error?.list[0].detail).toBe(
      'This is a custom error message',
    );
  });
});
