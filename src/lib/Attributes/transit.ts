import { decorateClassField } from '../lib';
import { TransitAttribute } from './TransitAttribute';

export function transit() {
  return decorateClassField(new TransitAttribute());
}
