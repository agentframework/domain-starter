import { Domain } from '../Domain';
import { AgentRegistry } from '../AgentRegistry';
import { InMemoryAgentRegistry } from './InMemoryAgentRegistry';
import { construct } from '../TypeFactory';
import { TypeConstructor } from '../TypeConstructor';
import { DomainAttribute } from '../Attributes/DomainAttribute';
import { IAttribute } from '../lib';

let id = 0;

export class InMemoryDomain extends Domain {
  public id: number = ++id;
  protected readonly parent?: Domain;
  protected readonly registry: AgentRegistry = new InMemoryAgentRegistry();

  constructor(parent?: Domain) {
    super();
    if (parent) this.parent = parent;
  }

  
  
  public construct<T extends object>(type: TypeConstructor<T>, params: ArrayLike<any>, transit?: boolean): T {
    const singleton = !transit;
    if (singleton && this.registry.hasAgent(type)) {
      return this.registry.getAgent(type)!;
    }
    const newCreated = construct(type, params, this);
    if (newCreated instanceof Promise) {
      throw new Error('NotAllowAsyncConstructor');
    }
    singleton && this.registry.addAgent(type, newCreated);
    return newCreated;
  }

  public resolve<T extends object>(type: TypeConstructor<T>, params: ArrayLike<any>, transit?: boolean): Promise<T> {
    const singleton = !transit;
    if (singleton && this.registry.hasAgent(type)) {
      const agent = this.registry.getAgent(type)!;
      if (agent instanceof Promise) {
        return agent;
      }
      return Promise.resolve(agent);
    }
    const newCreated = construct(type, params, this);
    if (singleton) this.registry.addAgent(type, newCreated);
    if (newCreated instanceof Promise) {
      return newCreated.then(newResolved => {
        // prevent double resolve
        if (singleton) this.registry.replaceAgent(type, newCreated, newResolved);
        return newResolved;
      });
    }
    return Promise.resolve(newCreated);
  }

  // allow all class
  onBeforeDecorateHook(attribute: IAttribute, target: Function): boolean {
    return true;
  }

  /**
   * Get a class attribute to decorate
   */
  getClassAttribute(): IAttribute {
    return new DomainAttribute({
      domain: this,
      newDomain(parent?: Domain) {
        return new InMemoryDomain(parent);
      }
    });
  }
}

// make sure local domain exists
Domain.local = new InMemoryDomain();
