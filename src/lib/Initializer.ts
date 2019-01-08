export const Initializer: unique symbol = Symbol('TypeInitializer');
export const Finalizer: unique symbol = Symbol('TypeFinalizer');

export interface TypeInitializer<T> {
  (...args: Array<any>): T | Promise<T>;
}

export interface TypeFinalizer<T> {
  (instance: T, ...args: Array<any>): T | Promise<T>;
}

export interface TypeConstructor<T> {
  new (...args: Array<any>): T;
  [Initializer]?(...args: Array<any>): T | Promise<T>;
  [Finalizer]?(instance: T, ...args: Array<any>): T | Promise<T>;
}

export function checkTypeConstructor<T>(type: TypeConstructor<T>): void {
  if (type.prototype[Initializer]) {
    throw new SyntaxError('NotAllowInitializerOnPrototype');
  }
  if (type.prototype[Finalizer]) {
    throw new SyntaxError('NotAllowFinalizerOnPrototype');
  }
}

export function checkTypeInstance(type: any): void {
  if (Reflect.has(type, Initializer)) {
    throw new SyntaxError('NotAllowInitializerOnInstance');
  }
  if (Reflect.has(type, Finalizer)) {
    throw new SyntaxError('NotAllowFinalizerOnInstance');
  }
}
