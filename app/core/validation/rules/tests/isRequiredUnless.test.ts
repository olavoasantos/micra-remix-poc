import {isRequiredUnless} from '../isRequiredUnless';
import {boolean, record, string} from '../..';
import {oneOf} from '../oneOf';

describe('isRequiredUnless', () => {
  it('is required unless a path is set', () => {
    const assert = record({
      shouldNotIncludeName: boolean(),
      name: isRequiredUnless({field: 'shouldNotIncludeName'}, string()),
    });

    const result = assert({
      name: 'John',
      shouldNotIncludeName: false,
    });

    expect(result).toMatchObject({valid: true});
  });

  it('is not required unless a given path is set', () => {
    const assert = record({
      shouldNotIncludeName: boolean(),
      name: isRequiredUnless({field: 'shouldNotIncludeName'}, string()),
    });

    expect(
      assert({
        shouldNotIncludeName: true,
      }),
    ).toMatchObject({valid: true});
  });

  it.only('is required unless a path is set to a given value', () => {
    const assert = record({
      shouldNotInclude: string(oneOf({options: ['name', 'email']})),
      name: isRequiredUnless(
        {field: 'shouldNotInclude', value: 'name'},
        string(),
      ),
    });

    expect(
      assert({
        name: 'John',
        shouldNotInclude: 'email',
      }),
    ).toMatchObject({valid: true});
  });

  it('is not required unless a path is set to a different value', () => {
    const assert = record({
      shouldNotInclude: string(oneOf({options: ['name', 'email']})),
      name: isRequiredUnless(
        {field: 'shouldNotInclude', value: 'name'},
        string(),
      ),
    });

    expect(
      assert({
        shouldNotInclude: 'name',
      }),
    ).toMatchObject({valid: true});
  });

  it('validates the value if it is required', () => {
    const assert = record({
      shouldNotIncludeName: boolean(),
      name: isRequiredUnless({field: 'shouldNotIncludeName'}, string()),
    });

    const result = assert({
      name: '',
      shouldNotIncludeName: false,
    });

    expect(result).toMatchObject({valid: false});
  });
});
