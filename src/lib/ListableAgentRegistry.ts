import { AgentRegistry } from './AgentRegistry';
import { Constructor } from './lib';

export abstract class ListableAgentRegistry extends AgentRegistry {
  abstract getAgentTypes(): Array<Constructor<any>>;
}
