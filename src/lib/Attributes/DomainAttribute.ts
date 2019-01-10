import { IInvocation, IInterceptorAttribute, IInterceptor } from '../lib';
import { Domain } from '../Domain';
import { Domains } from '../Utils/Cache';

export interface DomainAttributeOptions {
  scope?: 'private' | 'type';
  domain?: Domain;
  newDomain?: (parent?: Domain) => Domain;
}

export class DomainAttribute implements IInterceptorAttribute, IInterceptor {
  usePrivateScope?: boolean;
  domainScope?: any;
  domain?: Domain;
  newDomain: (parent?: Domain) => Domain;

  constructor(options: DomainAttributeOptions) {
    if (options.domain) {
      this.domain = options.domain;
    } else {
      this.usePrivateScope = options.scope === 'private';
      this.newDomain = options.newDomain!;
    }
  }

  beforeDecorate(target: Function): boolean {
    if (this.domain) {
      return this.domain.onBeforeDecorateHook(this, target);
    } else if (!this.usePrivateScope) {
      this.domainScope = target;
    }
    return true;
  }

  get interceptor() {
    return this;
  }

  private createDomain(parent?: Domain): Domain {
    if (this.domain) {
      return this.domain;
    }
    if (this.domainScope) {
      let domain = Domains.get(this.domainScope);
      if (!domain) {
        domain = this.newDomain(parent);
        Domains.set(this.domainScope, domain);
      }
      return domain;
    }
    return this.newDomain(parent);
  }

  intercept(target: IInvocation, parameters: ArrayLike<any>): any {
    let domain;
    let finalParameters;
    if (parameters && parameters.length) {
      if (Array.isArray(parameters)) {
        finalParameters = parameters.slice(0);
      } else {
        finalParameters = Array.prototype.slice.call(parameters, 0);
      }
      const caller = parameters[parameters.length - 1];
      if (caller instanceof Domain) {
        domain = this.createDomain(caller);
        finalParameters[parameters.length - 1] = domain;
      } else {
        domain = this.createDomain();
        finalParameters.push(domain);
      }
    } else {
      domain = this.createDomain();
      finalParameters = [domain];
    }
    const agent = target.invoke(finalParameters);
    Domains.set(agent, domain);
    return agent;
  }
}
