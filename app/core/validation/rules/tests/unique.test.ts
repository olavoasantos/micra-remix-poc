import {unique} from '../unique';
import {array, string, record} from '../..';

describe('unique', () => {
  it('should return true if the array only contains unique values', () => {
    const assert = array(string(), [unique()]);

    expect(assert(['a', 'b', 'c'])).toMatchObject({valid: true});
  });

  it('should return false if the array contains non-unique values', () => {
    const assert = array(string(), [unique()]);

    expect(assert(['a', 'b', 'a'])).toMatchObject({valid: false});
  });

  it('should return false if the array contains non-unique records', () => {
    const assert = array(record({id: string()}), [unique()]);

    const nonUniqueRecord = {id: 'a'};
    expect(assert([nonUniqueRecord, {id: 'b'}, nonUniqueRecord])).toMatchObject(
      {
        valid: false,
      },
    );
  });

  it('should return true if the array contains objects with a given unique field', () => {
    const assert = array(record({id: string()}), [unique({keys: ['id']})]);

    expect(assert([{id: 'a'}, {id: 'b'}, {id: 'c'}])).toMatchObject({
      valid: true,
    });
  });

  it('should return false if the array contains objects with a given non-unique field', () => {
    const assert = array(record({id: string()}), [unique({keys: ['id']})]);

    expect(assert([{id: 'a'}, {id: 'b'}, {id: 'a'}])).toMatchObject({
      valid: false,
    });
  });
});
