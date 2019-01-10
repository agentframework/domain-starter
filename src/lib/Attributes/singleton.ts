import { decorateClassField } from '../lib';
import { SingletonAttribute } from './SingletonAttribute';

export function singleton() {
  return decorateClassField(new SingletonAttribute());
}
