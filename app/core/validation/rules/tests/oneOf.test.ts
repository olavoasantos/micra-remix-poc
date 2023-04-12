import {oneOf} from '../oneOf';
import {string} from '../..';

describe('oneOf', () => {
  it('should be valid if a string is one of the given options', () => {
    const assert = string(oneOf({options: ['a', 'b', 'c']}));

    expect(assert('a')).toMatchObject({valid: true});
    expect(assert('b')).toMatchObject({valid: true});
    expect(assert('c')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not one of the given options', () => {
    const assert = string(oneOf({options: ['a', 'b', 'c']}));

    expect(assert('d')).toMatchObject({valid: false});
    expect(assert('e')).toMatchObject({valid: false});
    expect(assert('f')).toMatchObject({valid: false});
  });
});
