import { Constructor, Agent, IsAgent } from '../lib';
import { ShouldUpgradeType } from './ShouldUpgradeType';

export function UpgradeAgent<T>(type: Constructor<T>): Constructor<T> {
  // type is already upgrade to agent
  if (IsAgent(type)) {
    return type;
  }
  // upgrade to Agent only if interceptor or initializer found
  if (ShouldUpgradeType(type)) {
    return Agent(type);
  }
  // do not upgrade
  return type;
}
