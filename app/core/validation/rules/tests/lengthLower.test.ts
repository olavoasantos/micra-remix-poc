import {lengthLower} from '../lengthLower';
import {string, number, array, tuple} from '../..';

describe('lengthLower', () => {
  it('should be valid if a string is lower than the specified length', () => {
    const assert = string(lengthLower({than: 5}));

    expect(assert('hey')).toMatchObject({valid: true});
  });

  it('should be valid if a string is lower or equal the specified length', () => {
    const assert = string(lengthLower({than: 5, orEqual: true}));

    expect(assert('hello')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not lower than the specified length', () => {
    const assert = string(lengthLower({than: 5}));

    expect(assert('hello!')).toMatchObject({valid: false});
  });

  it('should be valid if an array is lower than the specified length', () => {
    const assert = array(number(), [lengthLower({than: 5})]);

    expect(assert([1, 2, 3, 4])).toMatchObject({valid: true});
  });

  it('should be valid if an array is lower or equal the specified length', () => {
    const assert = array(number(), [lengthLower({than: 5, orEqual: true})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be invalid if an array is not lower than the specified length', () => {
    const assert = array(number(), [lengthLower({than: 5})]);

    expect(assert([1, 2, 3, 4, 5, 6])).toMatchObject({valid: false});
  });

  it('should be valid if a tuple is lower than the specified length', () => {
    const assert = tuple([], [lengthLower({than: 5})]);

    expect(assert([1, 2, 3, 4])).toMatchObject({valid: true});
  });

  it('should be valid if a tuple is lower or equal the specified length', () => {
    const assert = tuple([], [lengthLower({than: 5, orEqual: true})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be invalid if a tuple is not lower than the specified length', () => {
    const assert = tuple([], [lengthLower({than: 5})]);

    expect(assert([1, 2, 3, 4, 5, 6])).toMatchObject({valid: false});
  });
});
