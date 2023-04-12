import {length} from '../length';
import {string, array, tuple, number} from '../..';

describe('length', () => {
  it('should be valid if a string is the correct length', () => {
    const assert = string(length({of: 5}));

    expect(assert('hello')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not the correct length', () => {
    const assert = string(length({of: 5}));

    expect(assert('world!')).toMatchObject({valid: false});
  });

  it('should be valid if an array is the correct length', () => {
    const assert = array(number(), [length({of: 5})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be invalid if an array is not the correct length', () => {
    const assert = array(number(), [length({of: 5})]);

    expect(assert([1, 2, 3, 4])).toMatchObject({valid: false});
  });

  it('should be valid if a tuple is the correct length', () => {
    const assert = tuple([], [length({of: 5})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be invalid if a tuple is not the correct length', () => {
    const assert = tuple([], [length({of: 5})]);

    expect(assert([1, 2, 3, 4])).toMatchObject({valid: false});
  });
});
