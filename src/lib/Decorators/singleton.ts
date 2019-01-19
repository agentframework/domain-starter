import { decorateClassField } from '../Dependencies';
import { SingletonAttribute } from '../Attributes/SingletonAttribute';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';

export function singleton<T extends object>(type?: AnyConstructor<T> | string) {
  return decorateClassField(new SingletonAttribute(type));
}
