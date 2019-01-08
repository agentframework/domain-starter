import { IInitializer, IInitializerAttribute, IInvocation } from 'agentframework';
import { Domain, Root } from '../Domain';

export class InjectAttribute<T> implements IInitializerAttribute, IInitializer {
  constructor() {}

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

    // the first parameter is app
    // the second parameter is identity ?
    const domain: any = parameters[0];
    if (domain instanceof Domain) {
      return domain.construct(type, parameters);
    } else {
      return Root.construct(type, parameters);
    }
  }
}
