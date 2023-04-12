import {email} from '../email';
import {string} from '../..';

describe('email', () => {
  it('should be valid if a given value is a valid email address', () => {
    const assert = string(email());

    expect(assert('something@something.com')).toMatchObject({valid: true});
    expect(assert('someone@localhost.localdomain')).toMatchObject({
      valid: true,
    });
    expect(assert('a/b@domain.com')).toMatchObject({valid: true});
    expect(assert('{}@domain.com')).toMatchObject({valid: true});
    expect(assert("m*'!%@something.sa")).toMatchObject({valid: true});
    expect(assert('tu!!7n7.ad##0!!!@company.ca')).toMatchObject({valid: true});
    expect(assert('%@com.com')).toMatchObject({valid: true});
    expect(assert("!#$%&'*+/=?^_`{|}~.-@com.com")).toMatchObject({valid: true});
    expect(assert('someone@do-ma-in.com')).toMatchObject({valid: true});
  });

  it('should be invalid if a given value is not a valid email address', () => {
    const assert = string(email());

    expect(assert('someone@127.0.0.1')).toMatchObject({valid: false});
    expect(assert('a@b.b')).toMatchObject({valid: false});
    expect(assert('.wooly@example.com')).toMatchObject({valid: false});
    expect(assert('wo..oly@example.com')).toMatchObject({valid: false});
    expect(assert('somebody@example')).toMatchObject({valid: false});
    expect(assert('\u000Aa@p.com\u000A')).toMatchObject({valid: false});
    expect(assert('\u000Da@p.com\u000D')).toMatchObject({valid: false});
    expect(assert('a\u000A@p.com')).toMatchObject({valid: false});
    expect(assert('a\u000D@p.com')).toMatchObject({valid: false});
    expect(assert('')).toMatchObject({valid: false});
    expect(assert(' ')).toMatchObject({valid: false});
    expect(assert(' a@p.com')).toMatchObject({valid: false});
    expect(assert('a@p.com ')).toMatchObject({valid: false});
    expect(assert(' a@p.com ')).toMatchObject({valid: false});
    expect(assert('\u0020a@p.com\u0020')).toMatchObject({valid: false});
    expect(assert('\u0009a@p.com\u0009')).toMatchObject({valid: false});
    expect(assert('\u000Ca@p.com\u000C')).toMatchObject({valid: false});
  });
});
