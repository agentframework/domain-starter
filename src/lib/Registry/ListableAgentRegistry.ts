import { AgentRegistry } from './AgentRegistry';
import { Constructor } from 'agentframework';

export abstract class ListableAgentRegistry extends AgentRegistry {
  abstract getAgentTypes(): Array<Constructor<any>>;
}
