import { DomainAttribute } from '../Attributes/DomainAttribute';
import { decorateClass } from '../Dependencies';

/**
 * scope is a `string` - retrieve the domain using scope name
 *                     - create a new domain with scope and set current domain as parent
 */
export function scope(): ClassDecorator {
  return decorateClass(new DomainAttribute());
}
