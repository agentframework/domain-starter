import { decorateClassField } from '../Dependencies';
import { TransitAttribute } from '../Attributes/TransitAttribute';
import { ClassConstructor } from '../Core/Factory/AnyConstructor';

export function transit<T extends object>(type?: ClassConstructor<T> | string) {
  return decorateClassField(new TransitAttribute(type));
}
