import { IInitializer, IInitializerAttribute, IInvocation } from 'agentframework';
import { Domain } from '../Domain';

export class InjectAttribute<T> implements IInitializerAttribute, IInitializer {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: PropertyDescriptor): boolean {
    return true;
  }

  get initializer() {
    return this;
  }

  initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const type = target.design && target.design.type;

    if (!type) {
      throw new TypeError(`InjectionTypeNotFound`);
    }

    // find the last parameter
    const pn = parameters.length;
    const domain = parameters[pn - 1];
    if (domain instanceof Domain) {
      return domain.construct(type, parameters);
    }
    return null;
  }
}
