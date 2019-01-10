import { UpgradeAgent } from './Utils/UpgradeAgent';
import { TypeInitializer } from './TypeInitializer';
import { TypeFinalizer } from './TypeFinalizer';
import { Constructor } from './lib';

export function checkTypeConstructor<T>(type: Constructor<T>): void {
  if (type.prototype[TypeInitializer]) {
    throw new SyntaxError('NotAllowInitializerOnPrototype');
  }
  if (type.prototype[TypeFinalizer]) {
    throw new SyntaxError('NotAllowFinalizerOnPrototype');
  }
}

export function checkTypeInstance<T>(type: T): void {
  if (type[TypeInitializer]) {
    throw new SyntaxError('NotAllowInitializerOnInstance');
  }
  if (type[TypeFinalizer]) {
    throw new SyntaxError('NotAllowFinalizerOnInstance');
  }
}

export function construct(target: any, parameters: ArrayLike<any>, caller: any): any {
  // in case of human mistake
  checkTypeConstructor(target);

  // put caller into last parameter
  let finalParameters;
  if (parameters && parameters.length) {
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
