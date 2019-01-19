import { IAttribute, IInvocation } from '../Dependencies';
import { Domain } from '../Core/Domain';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';
import { GetDomain } from '../Utils/Cache';

export class SingletonAttribute<T extends object> implements IAttribute {
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
    const type = this.type || (target.design && target.design.type);

    if (!type) {
      throw new TypeError(`SingletonTypeNotFound`);
    }
  
    // if this object created by domain, the last argument is domain itself
    let domain;
    if (target.agent) {
      domain = target.agent instanceof Domain ? target.agent : GetDomain(target.agent);
    }
  
    if (!(domain instanceof Domain)) {
      const tail = parameters[parameters.length - 1];
      if (tail instanceof Domain) {
        domain = tail;
      }
    }

    if (domain instanceof Domain) {
      return domain.getAgent(type) || domain.construct(type, parameters);
    } else {
      throw new Error('DomainNotFound');
    }
  }
}
