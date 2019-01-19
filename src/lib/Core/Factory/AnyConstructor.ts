import { ClassInitializer } from '../ClassInitializer';
import { ClassFinalizer } from '../ClassFinalizer';
import { Domain } from '../Domain';

export interface TypeConstructor<T extends object> extends Function {
  prototype: T;
  new (...parameters: any): T;
}

export interface AbstractConstructor<T extends object> extends Function {
  prototype: T;
}

export interface ClassConstructor<T extends object> extends TypeConstructor<T> {
  [ClassInitializer]?(domain: Domain, ...parameters: any): T | Promise<T>;
  [ClassFinalizer]?(instance: T, domain: Domain, ...parameters: any): T | Promise<T>;
}

export interface AbstractClassConstructor<T extends object> extends AbstractConstructor<T> {
  [ClassInitializer]?(domain: Domain, ...parameters: any): T | Promise<T>;
  [ClassFinalizer]?(instance: T, domain: Domain, ...parameters: any): T | Promise<T>;
}

export type AnyConstructor<T extends object> = ClassConstructor<T> | AbstractClassConstructor<T>;
