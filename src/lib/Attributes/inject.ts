import { decorateClassField } from '../lib';
import { InjectAttribute } from './InjectAttribute';

export function inject() {
  return decorateClassField(new InjectAttribute());
}
