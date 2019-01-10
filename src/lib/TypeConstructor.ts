import { TypeInitializer } from './TypeInitializer';
import { TypeFinalizer } from './TypeFinalizer';

export interface TypeConstructor<T extends object> {
  new (...args: Array<any>): T;

  [TypeInitializer]?(...args: Array<any>): T | Promise<T>;

  [TypeFinalizer]?(instance: T, ...args: Array<any>): T | Promise<T>;
}

export type AbstractTypeConstructor<T extends object> = Function & { prototype: T };

export type GenericTypeConstructor<T extends object> = TypeConstructor<T> | AbstractTypeConstructor<T>;
