import { Member, Reflector } from '../lib';

export function GetMember(
  target: Object | Function,
  targetKey?: string | symbol,
  descriptor?: PropertyDescriptor | number
): Member<any> {
  const isClass = typeof target === 'function';
  const isParameter = typeof descriptor === 'number';
  if (isClass) {
    if (isParameter) {
      return Reflector(target).parameter(descriptor as number);
    }
    return Reflector(target);
  }
  if (isParameter) {
    return Reflector(target)
      .property(targetKey!)
      .value.parameter(descriptor as number);
  } else if (descriptor) {
    return Reflector(target).property(targetKey!, descriptor as PropertyDescriptor).value;
  }
  return Reflector(target).property(targetKey!).value;
}
