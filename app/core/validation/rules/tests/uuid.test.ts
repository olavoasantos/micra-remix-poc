import {uuid} from '../uuid';
import {string} from '../..';

describe('uuid', () => {
  it('should return a valid uuid', () => {
    const assert = string(uuid());

    expect(assert('d3c2a3a3-3b0b-4e3e-9f7e-6c1f6b0f6b3d')).toMatchObject({
      valid: true,
    });
  });

  it('should return an invalid uuid', () => {
    const assert = string(uuid());

    expect(assert('d3c2a3a3-3b0b-4e3e-9f7e-6c1f6b0f6b3')).toMatchObject({
      valid: false,
    });
  });
});
