import {alpha} from '../alpha';
import {string} from '../..';

describe('alpha', () => {
  it('should return true for string values containing only letters', () => {
    const assert = string(alpha());

    expect(assert('abc')).toMatchObject({
      value: 'abc',
      valid: true,
    });
  });

  it('should return false for string values containing non-letter characters', () => {
    const assert = string(alpha());

    expect(assert('abc123')).toMatchObject({
      value: 'abc123',
      valid: false,
    });
  });

  it('should return true for string values containing letters and numbers', () => {
    const assert = string(alpha({and: ['numbers']}));

    expect(assert('abc123')).toMatchObject({
      value: 'abc123',
      valid: true,
    });
  });

  it('should return true for string values containing letters and spaces', () => {
    const assert = string(alpha({and: ['spaces']}));

    expect(assert('abc def')).toMatchObject({
      value: 'abc def',
      valid: true,
    });
  });

  it('should return true for string values containing letters and dashes', () => {
    const assert = string(alpha({and: ['dashes']}));

    expect(assert('abc-def')).toMatchObject({
      value: 'abc-def',
      valid: true,
    });
  });

  it('should return true for string values containing letters and underscores', () => {
    const assert = string(alpha({and: ['underscores']}));

    expect(assert('abc_def')).toMatchObject({
      value: 'abc_def',
      valid: true,
    });
  });

  it('should return true for string values containing letters and numbers, spaces, dashes, and underscores', () => {
    const assert = string(
      alpha({and: ['numbers', 'spaces', 'dashes', 'underscores']}),
    );

    expect(assert('abc123 def-ghi_jkl')).toMatchObject({
      value: 'abc123 def-ghi_jkl',
      valid: true,
    });
  });
});
