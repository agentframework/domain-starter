import { Constructor } from 'agentframework';

export function IsAssignableFrom<T>(type: Constructor<T>, instance: any): boolean {
  return true;
}
