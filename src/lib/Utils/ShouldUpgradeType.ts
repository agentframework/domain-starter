import { Constructor, Reflector } from '../lib';
import { AnalyzedTypes } from './Cache';

export function ShouldUpgradeType(type: Constructor<any>): boolean {
  if (AnalyzedTypes.has(type)) {
    return AnalyzedTypes.get(type) || false;
  }

  const Type = Reflector(type);

  let should = false;

  if (Type.hasInterceptor() || Type.hasInterceptor()) {
    should = true;
  } else {
    for (const prop of Type.properties()) {
      if (prop.value.hasInterceptor() || prop.value.hasInitializer()) {
        should = true;
        break;
      }
      if (prop.setter.hasInterceptor() || prop.setter.hasInitializer()) {
        should = true;
        break;
      }
      if (prop.getter.hasInterceptor() || prop.getter.hasInitializer()) {
        should = true;
        break;
      }
    }
  }

  AnalyzedTypes.set(type, should);
  return should;
}
