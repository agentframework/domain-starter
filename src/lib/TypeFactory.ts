import { UpgradeAgent } from './Utils/UpgradeAgent';
import { TypeInitializer } from './TypeInitializer';
import { TypeFinalizer } from './TypeFinalizer';

export interface TypeConstructor<T> {
  new (...args: Array<any>): T;
  [TypeInitializer]?(...args: Array<any>): T | Promise<T>;
  [TypeFinalizer]?(instance: T, ...args: Array<any>): T | Promise<T>;
}

export function checkTypeConstructor<T>(type: TypeConstructor<T>): void {
  if (type.prototype[TypeInitializer]) {
    throw new SyntaxError('NotAllowInitializerOnPrototype');
  }
  if (type.prototype[TypeFinalizer]) {
    throw new SyntaxError('NotAllowFinalizerOnPrototype');
  }
}

export function checkTypeInstance(type: any): void {
  if (Reflect.has(type, TypeInitializer)) {
    throw new SyntaxError('NotAllowInitializerOnInstance');
  }
  if (Reflect.has(type, TypeFinalizer)) {
    throw new SyntaxError('NotAllowFinalizerOnInstance');
  }
}

export function construct<T>(target: TypeConstructor<T>, parameters: ArrayLike<any>, caller: any): T {
  // in case of human mistake
  checkTypeConstructor(target);

  // check parameters
  let finalParameters;
  if (parameters) {
    if (parameters[parameters.length - 1] !== caller) {
      if (Array.isArray(parameters)) {
        finalParameters = parameters.concat(caller);
      } else {
        finalParameters = Array.prototype.slice.call(parameters, 0).concat(caller);
      }
    } else {
      finalParameters = parameters;
    }
  } else {
    finalParameters = [caller];
  }

  // get initializer factory from type
  const initializerFunction = target[TypeInitializer];

  let result;
  if (initializerFunction) {
    result = Reflect.apply(initializerFunction, target, finalParameters);
  } else {
    result = Reflect.construct(UpgradeAgent(target), finalParameters);
  }

  // in case of human mistake
  checkTypeInstance(result);

  return result;
}
