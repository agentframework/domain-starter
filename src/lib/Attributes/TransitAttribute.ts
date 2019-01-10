import { IAttribute, IInvocation } from '../lib';
import { Domain } from '../Domain';

export class TransitAttribute implements IAttribute {
  beforeDecorate(target: Object | Function, targetKey?: string | symbol, descriptor?: number): boolean {
    return true;
  }

  get initializer() {
    return this;
  }

  initialize(target: IInvocation, parameters: ArrayLike<any>): any {
    const type = target.design && target.design.type;

    if (!type) {
      throw new TypeError(`TransitTypeNotFound`);
    }

    // if this object created by domain, the last argument is domain itself
    const pn = parameters.length;
    const domain = parameters[pn - 1];
    if (domain instanceof Domain) {
      return domain.construct(type, parameters, true);
    } else if (Domain.local) {
      return Domain.local.construct(type, parameters, true);
    }
    throw new Error('DomainNotFound');
  }
}
