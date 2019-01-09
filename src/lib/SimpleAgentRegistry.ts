import { Constructor } from 'agentframework';
import { AgentRegistry } from './Registry/AgentRegistry';

export class SimpleAgentRegistry extends AgentRegistry {
  private agents = new WeakMap<Constructor, any>();

  public getAgent<T>(type: Constructor<T>): T | undefined {
    return this.agents.get(type);
  }

  public hasAgent<T>(type: Constructor<T>): boolean {
    return this.agents.has(type);
  }

  public addAgent<T>(type: Constructor<T>, agent: T): void {
    if (this.agents.has(type)) {
      throw new Error('AgentAlreadyExist');
    }
    this.agents.set(type, agent);
  }

  public replaceAgent<T>(type: Constructor<T>, origin: T, replace: T): void {
    if (this.agents.get(type) !== origin) {
      throw new Error('OriginAgentNotMatch');
    }
    this.agents.set(type, replace);
  }

  public deleteAgent<T>(type: Constructor<T>, agent: T): void {
    this.agents.delete(type);
  }
}
