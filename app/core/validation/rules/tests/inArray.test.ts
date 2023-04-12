import {inArray} from '../inArray';
import {record, array, string} from '../..';

describe('inArray', () => {
  it('should be valid if a string is in an array set in a given path', () => {
    const assert = record({
      name: string(inArray({path: 'names'})),
      names: array(string()),
    });

    expect(
      assert({
        name: 'John',
        names: ['John', 'Doe'],
      }),
    ).toMatchObject({valid: true});
  });

  it('should be invalid if a string is not in an array set in a given path', () => {
    const assert = record({
      name: string(inArray({path: 'names'})),
      names: array(string()),
    });

    expect(
      assert({
        name: 'John',
        names: ['Doe'],
      }),
    ).toMatchObject({valid: false});
  });
});
