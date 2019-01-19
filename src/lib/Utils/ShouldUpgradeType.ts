import { Reflector } from '../Dependencies';
import { AnalyzedTypes } from './Cache';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';

export function ShouldUpgradeType(target: AnyConstructor<any>): boolean {
  if (AnalyzedTypes.has(target)) {
    return AnalyzedTypes.get(target) || false;
  }

  const root = Reflector(target);
  let should = false;

  for (const type of root.types()) {
    if (type.hasInterceptor() || type.hasInterceptor() || type.hasParameters()) {
      should = true;
      break;
    } else {
      for (const prop of type.properties()) {
        if (prop.value.hasInterceptor() || prop.value.hasInitializer() || prop.value.hasParameters()) {
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
  }

  AnalyzedTypes.set(target, should);
  return should;
}
