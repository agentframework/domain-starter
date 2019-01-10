import { decorateClass } from '../lib';
import { DomainAttribute, DomainAttributeOptions } from './DomainAttribute';
import { Domain } from '../Domain';
import { InMemoryDomain } from '../Core/InMemoryDomain';

export function domain(options?: DomainAttributeOptions) {
  return decorateClass(
    new DomainAttribute({
      newDomain: (parent?: Domain) => {
        return new InMemoryDomain(parent);
      },
      ...options
    })
  );
}
