import {lengthBetween} from '../lengthBetween';
import {string, array, tuple, number} from '../..';

describe('lengthBetween', () => {
  it('should be valid if a string is between the specified lengths', () => {
    const assert = string(lengthBetween({min: 5, max: 10}));

    expect(assert('hello!')).toMatchObject({valid: true});
  });

  it('should be valid if a string is equal to the minimum length if orEqual is true', () => {
    const assert = string(lengthBetween({orEqual: true, min: 5, max: 10}));

    expect(assert('hello')).toMatchObject({valid: true});
  });

  it('should be valid if a string is equal to the maximum length if orEqual is true', () => {
    const assert = string(lengthBetween({orEqual: true, min: 5, max: 11}));

    expect(assert('hello world')).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not between the specified lengths', () => {
    const assert = string(lengthBetween({min: 5, max: 10}));

    expect(assert('world')).toMatchObject({valid: false});
  });

  it('should be valid if an array is between the specified lengths', () => {
    const assert = array(number(), [lengthBetween({min: 5, max: 10})]);

    expect(assert([1, 2, 3, 4, 5, 6])).toMatchObject({valid: true});
  });

  it('should be valid if an array is equal to the minimum length if orEqual is true', () => {
    const assert = array(number(), [
      lengthBetween({orEqual: true, min: 5, max: 10}),
    ]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be valid if an array is equal to the maximum length if orEqual is true', () => {
    const assert = array(number(), [
      lengthBetween({orEqual: true, min: 5, max: 10}),
    ]);

    expect(assert([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if an array is not between the specified lengths', () => {
    const assert = array(number(), [lengthBetween({min: 5, max: 10})]);

    expect(assert([1, 2, 3, 4])).toMatchObject({valid: false});
  });

  it('should be valid if a tuple is between the specified lengths', () => {
    const assert = tuple([], [lengthBetween({min: 5, max: 10})]);

    expect(assert([1, 2, 3, 4, 5, 6])).toMatchObject({valid: true});
  });

  it('should be valid if a tuple is equal to the minimum length if orEqual is true', () => {
    const assert = tuple([], [lengthBetween({orEqual: true, min: 5, max: 10})]);

    expect(assert([1, 2, 3, 4, 5])).toMatchObject({valid: true});
  });

  it('should be valid if a tuple is equal to the maximum length if orEqual is true', () => {
    const assert = tuple([], [lengthBetween({orEqual: true, min: 5, max: 10})]);

    expect(assert([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toMatchObject({
      valid: true,
    });
  });

  it('should be invalid if a tuple is not between the specified lengths', () => {
    const assert = tuple([], [lengthBetween({min: 5, max: 10})]);

    expect(assert([1, 2, 3, 4])).toMatchObject({valid: false});
  });
});
