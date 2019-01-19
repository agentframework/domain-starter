import { decorateClassField } from '../Dependencies';
import { InjectAttribute } from '../Attributes/InjectAttribute';
import { ClassConstructor } from '../Core/Factory/AnyConstructor';

export function inject<T extends object>(type?: ClassConstructor<T>) {
  return decorateClassField(new InjectAttribute(type));
}
