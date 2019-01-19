import { Domain } from '../Core/Domain';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';

export const AnalyzedTypes = new WeakMap<AnyConstructor<object>, boolean>();

export const Domains = new Map<object, Domain>();

export function GetDomain(agent: object): Domain | undefined {
  return Domains.get(agent);
}
