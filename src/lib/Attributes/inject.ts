import { decorateClassField } from 'agentframework';
import { InjectAttribute } from './InjectAttribute';

export function inject() {
  return decorateClassField(new InjectAttribute());
}
