import { UpgradeAgent } from '../../Utils/UpgradeAgent';
import { ClassInitializer } from '../ClassInitializer';
import { ClassFinalizer } from '../ClassFinalizer';
import { AnyConstructor } from './AnyConstructor';
import { Constructor } from '../../Dependencies';

export function checkTypeConstructor<T extends object>(type: AnyConstructor<T>): void {
  if (type.prototype[ClassInitializer]) {
    throw new SyntaxError('NotAllowInitializerOnPrototype');
  }
  if (type.prototype[ClassFinalizer]) {
    throw new SyntaxError('NotAllowFinalizerOnPrototype');
  }
}

export function checkTypeInstance<T>(type: T): void {
  if (type[ClassInitializer]) {
    throw new SyntaxError('NotAllowInitializerOnInstance');
  }
  if (type[ClassFinalizer]) {
    throw new SyntaxError('NotAllowFinalizerOnInstance');
  }
}

export function construct<T extends object>(target: AnyConstructor<T>, parameters: ArrayLike<any>, tail?: object): T {
  // in case of human mistake
  checkTypeConstructor(target);

  let finalParameters;
  if (tail) {
    // put caller into last parameter if not found
    const pl = parameters.length;
    if (pl) {
      if (parameters[pl - 1] === tail) {
        finalParameters = parameters;
      } else {
        finalParameters = Array.prototype.slice.call(parameters, 0).concat(tail);
      }
    } else {
      finalParameters = [tail];
    }
  } else {
    finalParameters = parameters;
  }

  // get initializer factory from type
  const initializerFunction = target[ClassInitializer];

  let result;
  if (initializerFunction) {
    result = Reflect.apply(initializerFunction, target, finalParameters);
  } else {
    result = Reflect.construct(UpgradeAgent(<Constructor<T>>target), finalParameters);
  }

  // in case of human mistake
  checkTypeInstance(result);

  return result;
}
