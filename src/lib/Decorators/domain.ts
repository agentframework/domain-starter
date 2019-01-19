import { DomainAttribute } from '../Attributes/DomainAttribute';
import { AgentAttribute, decorateAgent, IAttribute } from '../Dependencies';

/**
 * scope is a `string` - retrieve the domain using scope name
 *                     - create a new domain with scope and set current domain as parent
 */
export function domain(attributes?: IAttribute[]): ClassDecorator {
  if (!attributes) {
    attributes = <IAttribute[]>[];
  }
  attributes.push(new DomainAttribute());
  return decorateAgent(new AgentAttribute(), attributes);
}
