import { Constructor } from 'agentframework';

export abstract class AgentRegistry {
  abstract getAgent<T>(type: Constructor<T>): T | undefined;
  abstract hasAgent<T>(type: Constructor<T>): boolean;
  abstract addAgent<T>(type: Constructor<T>, agent: T): void;
  abstract replaceAgent<T>(type: Constructor<T>, origin: T, replace: T): void;
  abstract deleteAgent<T>(type: Constructor<T>, agent: T): void;
}
