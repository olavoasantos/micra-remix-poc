import type {GUARD_SYMBOL} from '../constants/symbols';

/* eslint-disable @typescript-eslint/ban-types */
interface ValidationError extends Micra.Error {
  list: Micra.ErrorMessage[];
  push(message: Partial<Micra.ErrorMessage>): void;
}

export interface SuccessfulRuleResult<Value> {
  valid: true;
  value: Value;
  extras?: any;
}

export interface FailedRuleResult<Value> {
  valid: false;
  message: string;
  value: Value;
  extras?: any;
}

export type RuleResult<Value> =
  | SuccessfulRuleResult<Value>
  | FailedRuleResult<Value>;

export interface TypeGuardContext<Value> {
  value: Value;
  path?: string;
  preRules?: Checkable<Value>[];
  rules: Checkable<Value>[];
  postRules?: Checkable<Value>[];
  context?: TypeGuardContext<any>;
}

export type Rule<Value = any> = (
  context: TypeGuardContext<Value>,
) => RuleResult<Value>;

export interface ValidType<Type> {
  valid: true;
  value: Type;
  error: undefined;
}

export interface InvalidType<Type> {
  valid: false;
  value: Type;
  error: ValidationError;
}

export type TypeGuardResult<Type> = ValidType<Type> | InvalidType<Type>;

export interface TypeGuard<Type> {
  (value: any): TypeGuardResult<Type>;
  [GUARD_SYMBOL]: true;
  check: Rule<Type>;
  extend(...rules: Checkable<Type>[]): TypeGuard<Type>;
  infer: Type;
  message(): string;
  setMessage(message: string): void;
}

export type Checkable<Type> = TypeGuard<Type> | Rule<Type>;

export interface RuleFactory<Value, Options = never> {
  (options?: Options): Rule<Value>;
}

export type OmitNever<T> = Omit<
  T,
  {[Key in keyof T]-?: T[Key] extends never ? Key : never}[keyof T]
>;

export type Prettify<T extends Record<any, any>> = {
  [Key in keyof T]: T[Key];
} & {};

export type Optionalize<T extends Record<any, any>> = Prettify<
  Partial<
    OmitNever<{
      [K in keyof T]: undefined extends T[K] ? T[K] : never;
    }>
  > &
    OmitNever<{
      [K in keyof T]: undefined extends T[K] ? never : T[K];
    }>
>;

export type ToMutableArray<T extends Array<any> | ReadonlyArray<any>> =
  T extends Array<any>
    ? T extends readonly [...infer U]
      ? {[Key in keyof U]: U[Key]}
      : never
    : T extends ReadonlyArray<any>
    ? T extends readonly [...infer U]
      ? {[Key in keyof U]: U[Key]}
      : never
    : never;

export type Verifier<T> = (context: TypeGuardContext<T>) => TypeGuardResult<T>;
