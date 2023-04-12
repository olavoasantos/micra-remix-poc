import type {TypeGuard} from '../types';
import {typeGuard} from '../utilities/typeGuard';

export function optional<Type>(rule: TypeGuard<Type>, fallback?: Type) {
  const guard = typeGuard<Type | undefined>([], function guard(ctx) {
    return ctx.value == null
      ? {
          valid: true,
          value: ctx.value === null && !fallback ? ctx.value : fallback,
        }
      : (rule as any)(ctx.value, ctx.context);
  });

  return guard;
}
