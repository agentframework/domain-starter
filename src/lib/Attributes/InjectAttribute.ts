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

import { IInitializer, IInitializerAttribute, IInvocation } from '../lib';
import { Domain } from '../Core/Domain';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';

export class InjectAttribute<T extends object> implements IInitializerAttribute, IInitializer {
  type?: AnyConstructor<T>;

  constructor(type?: AnyConstructor<T> | string) {
    if (typeof type === 'string') {
      // lookup type from local type registration
      throw new Error('NotImplementedYet');
    } else {
      this.type = type;
    }
  }

  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: number): boolean {
    return true;
  }

  get initializer() {
    return this;
  }

  initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const type = target.design && target.design.type;

    if (!type) {
      throw new TypeError(`InvalidTarget`);
    }

    // if this object created by domain, the last argument is domain itself
    const pn = parameters.length;
    const domain = parameters[pn - 1];
    if (domain instanceof Domain) {
      return domain.getAgent(type);
    } else {
      throw new Error('DomainNotFound');
    }
  }
}
