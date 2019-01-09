import { construct, TypeConstructor } from './TypeFactory';
import { SimpleAgentRegistry } from './SimpleAgentRegistry';
import { AgentRegistry } from './Registry/AgentRegistry';

export class Domain<T> {
  protected registry: AgentRegistry = new SimpleAgentRegistry();

  public construct<T extends object>(type: TypeConstructor<T>, params: ArrayLike<any>): T {
    if (this.registry.hasAgent(type)) {
      return this.registry.getAgent(type)!;
    }
    const result = construct(type, params, this);
    if (result instanceof Promise) {
      throw new TypeError('NotAllowConstructPromiseObject');
    } else {
      // remember this
      this.registry.addAgent(type, result);
    }
    return result;
  }

  public resolve<T extends object>(type: TypeConstructor<T>, params: ArrayLike<any>): Promise<T> {
    if (this.registry.hasAgent(type)) {
      const agent = this.registry.getAgent(type)!;
      if (agent instanceof Promise) {
        return agent;
      }
      return Promise.resolve(agent);
    }
    const newCreated = construct(type, params, this);
    this.registry.addAgent(type, newCreated);
    if (newCreated instanceof Promise) {
      return newCreated.then(newResolved => {
        this.registry.replaceAgent(type, newCreated, newResolved);
        return newResolved;
      });
    }
    return Promise.resolve(newCreated);
  }
}
