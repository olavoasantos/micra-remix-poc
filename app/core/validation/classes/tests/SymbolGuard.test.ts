import {isRequired} from '../../rules/isRequired';
import {SymbolGuard} from '../SymbolGuard';

describe('SymbolGuard', () => {
  it('should return a valid result when the value is a symbol', () => {
    const AssertSymbol = SymbolGuard();
    const result = AssertSymbol(Symbol.for('test'));
    expect(result.valid).toBe(true);
    expect(result.value).toEqual(Symbol.for('test'));
  });

  it('should return an invalid result when the value is not a symbol', () => {
    const AssertSymbol = SymbolGuard();
    const result = AssertSymbol('test');
    expect(result.valid).toBe(false);
    expect(result.value).toEqual('test');
    expect(result.error).toBeDefined();
  });

  it('should accept custom rules', () => {
    const AssertSymbol = SymbolGuard(isRequired());
    expect(AssertSymbol(Symbol('test')).valid).toBe(true);
    expect(AssertSymbol(null).valid).toBe(false);
  });
});
