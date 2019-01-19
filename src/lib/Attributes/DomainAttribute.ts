import { IInvocation, IInterceptorAttribute, IInterceptor } from '../Dependencies';
import { Domain } from '../Core/Domain';
import { Domains } from '../Utils/Cache';

export class DomainAttribute implements IInterceptorAttribute, IInterceptor {
  constructor(private domain?: Domain) {}

  beforeDecorate(target: Function): boolean {
    if (this.domain) {
      return this.domain.beforeDecorate(this, target);
    }
    return true;
  }

  get interceptor() {
    return this;
  }

  private createDomain(caller?: Domain): Domain {
    if (this.domain) {
      return this.domain;
    }

    if (caller) {
      return caller.construct(Domain, [], true);
    }

    throw new Error('ParentDomainNotFound');
  }

  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    let domain: Domain;
    let finalParameters;

    if (parameters) {
      const pl = parameters.length;
      const caller = parameters[pl - 1];

      if (caller instanceof Domain) {
        if (caller === this.domain) {
          domain = caller;
          finalParameters = parameters;
        } else {
          finalParameters = Array.prototype.slice.call(parameters, 0);
          domain = this.createDomain(caller);
          finalParameters[pl - 1] = domain;
        }
      } else {
        finalParameters = Array.prototype.slice.call(parameters, 0);
        domain = this.createDomain();
        finalParameters.push(domain);
      }
    } else {
      domain = this.createDomain();
      finalParameters = [domain];
    }

    const agent = target.invoke(finalParameters);
    // remember domain
    Domains.set(agent, domain);
    domain.addAgent(Object.getPrototypeOf(agent).constructor, agent);
    return agent;
  }
}
