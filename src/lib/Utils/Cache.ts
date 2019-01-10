import { Constructor } from 'agentframework';
import { Domain } from '../Domain';

export const AnalyzedTypes = new WeakMap<Constructor<object>, boolean>();

export const Domains = new WeakMap<object, Domain>();

export function GetDomain(agent: object): Domain | undefined {
  return Domains.get(agent);
}
