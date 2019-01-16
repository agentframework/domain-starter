/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { DomainAttribute } from '../Attributes/DomainAttribute';
import { AgentAttribute, decorateAgent, IAttribute } from 'agentframework';

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
