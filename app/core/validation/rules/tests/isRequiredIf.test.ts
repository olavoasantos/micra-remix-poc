import {isRequiredIf} from '../isRequiredIf';
import {boolean, record, string} from '../..';
import {oneOf} from '../oneOf';

describe('isRequiredIf', () => {
  it('is required if a path is set', () => {
    const assert = record({
      shouldIncludeName: boolean(),
      name: isRequiredIf({field: 'shouldIncludeName'}, string()),
    });

    const result = assert({
      name: 'John',
      shouldIncludeName: true,
    });

    expect(result).toMatchObject({valid: true});
  });

  it('is not required if a given path is not set', () => {
    const assert = record({
      shouldIncludeName: boolean(),
      name: isRequiredIf({field: 'shouldIncludeName'}, string()),
    });

    expect(
      assert({
        shouldIncludeName: false,
      }),
    ).toMatchObject({valid: true});
  });

  it('is required if a path is set to a given value', () => {
    const assert = record({
      shouldInclude: string(oneOf({options: ['name']})),
      name: isRequiredIf({field: 'shouldInclude', value: 'name'}, string()),
    });

    expect(
      assert({
        name: 'John',
        shouldInclude: 'name',
      }),
    ).toMatchObject({valid: true});
  });

  it('is not required if a path is set to a different value', () => {
    const assert = record({
      shouldInclude: string(oneOf({options: ['name', 'email']})),
      name: isRequiredIf({field: 'shouldInclude', value: 'name'}, string()),
    });

    expect(
      assert({
        shouldInclude: 'email',
      }),
    ).toMatchObject({valid: true});
  });

  it('validates the value if it is required', () => {
    const assert = record({
      shouldInclude: string(oneOf({options: ['name', 'email']})),
      name: isRequiredIf({field: 'shouldInclude', value: 'name'}, string()),
    });

    expect(
      assert({
        name: 123,
        shouldInclude: 'name',
      }),
    ).toMatchObject({valid: false});
  });

  it('validates the value if it is not required and it exists', () => {
    const assert = record({
      shouldInclude: string(oneOf({options: ['name', 'email']})),
      name: isRequiredIf({field: 'shouldInclude', value: 'name'}, string()),
    });

    expect(
      assert({
        name: 123,
        shouldInclude: 'email',
      }),
    ).toMatchObject({valid: false});
  });
});
