import {lengthGreater} from '../lengthGreater';
import {string, number, array, tuple} from '../..';

describe('lengthGreater', () => {
  it('should be valid if a string is greater than the specified length', () => {
    const assert = string(lengthGreater({than: 5}));

    expect(assert('hello!')).toMatchObject({valid: true});
  });

  it('should be valid if a string is greater or equal the specified length', () => {
    const assert = string(lengthGreater({than: 5, orEqual: true}));

    expect(assert('world')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not greater than the specified length', () => {
    const assert = string(lengthGreater({than: 5}));

    expect(assert('world')).toMatchObject({valid: false});
  });

  it('should be valid if an array is greater than the specified length', () => {
    const assert = array(number(), [lengthGreater({than: 5})]);

    expect(assert([1, 2, 3, 4, 5, 6])).toMatchObject({valid: true});
  });

  it('should be valid if an array is greater or equal the specified length', () => {
    const assert = array(number(), [lengthGreater({than: 5, orEqual: true})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be invalid if an array is not greater than the specified length', () => {
    const assert = array(number(), [lengthGreater({than: 5})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: false});
  });

  it('should be valid if a tuple is greater than the specified length', () => {
    const assert = tuple([], [lengthGreater({than: 5})]);

    expect(assert([1, 2, 3, 4, 5, 6])).toMatchObject({valid: true});
  });

  it('should be valid if a tuple is greater or equal the specified length', () => {
    const assert = tuple([], [lengthGreater({than: 5, orEqual: true})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be invalid if a tuple is not greater than the specified length', () => {
    const assert = tuple([], [lengthGreater({than: 5})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: false});
  });
});
