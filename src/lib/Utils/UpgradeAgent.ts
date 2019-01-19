import { Constructor, Agent, IsAgent } from '../Dependencies';
import { ShouldUpgradeType } from './ShouldUpgradeType';

const Agents = new WeakMap();

export function UpgradeAgent<T>(type: Constructor<T>): Constructor<T> {
  // type is already upgrade to agent
  if (IsAgent(type)) {
    return type;
  }

  if (Agents.has(type)) {
    return Agents.get(type)!;
  }

  // upgrade to Agent only if interceptor or initializer found
  if (ShouldUpgradeType(type)) {
    const agent = Agent(type);
    Agents.set(type, agent);
    return agent;
  }
  // do not upgrade
  return type;
}
