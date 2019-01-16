/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { UpgradeAgent } from '../../Utils/UpgradeAgent';
import { ClassInitializer } from '../ClassInitializer';
import { ClassFinalizer } from '../ClassFinalizer';
import { AnyConstructor } from './AnyConstructor';
import { Constructor } from 'agentframework';

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

export function ensureLast(parameters: ArrayLike<any>, caller?: object): ArrayLike<any> {
  if (caller) {
    // put caller into last parameter if not found
    const pl = parameters.length;
    if (pl) {
      if (parameters[pl - 1] !== caller) {
        return Array.prototype.slice.call(parameters, 0).concat(caller);
      } else {
        return parameters;
      }
    } else {
      return [caller];
    }
  } else {
    return parameters;
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
