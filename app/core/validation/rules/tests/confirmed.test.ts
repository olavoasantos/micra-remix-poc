import {confirmed} from '../confirmed';
import {record, string} from '../..';

describe('confirmed', () => {
  it('should be valid if a given value is confirmed by a *_confirmation entry', () => {
    const assert = record({
      password: string(confirmed()),
    });

    expect(
      assert({
        password: 'password',
        password_confirmation: 'password',
      }),
    ).toMatchObject({
      valid: true,
    });
  });
  it('should be valid if a given value is confirmed by a *Confirmation entry', () => {
    const assert = record({
      password: string(confirmed()),
    });

    expect(
      assert({
        password: 'password',
        passwordConfirmation: 'password',
      }),
    ).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a given value is not confirmed by a *_confirmation nor *Confirmation entry', () => {
    const assert = record({
      password: string(confirmed()),
    });

    expect(
      assert({
        password: 'password',
        password_confirmation: 'not password',
      }),
    ).toMatchObject({
      valid: false,
    });
  });

  it('should match a custom confirmation field name', () => {
    const assert = record({
      password: string(confirmed({by: 'confirmation'})),
    });

    expect(
      assert({
        password: 'password',
        confirmation: 'password',
      }),
    ).toMatchObject({
      valid: true,
    });
  });
});
