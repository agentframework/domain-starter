/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import { Reflector } from '../lib';
import { AnalyzedTypes } from './Cache';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';

export function ShouldUpgradeType(type: AnyConstructor<any>): boolean {
  if (AnalyzedTypes.has(type)) {
    return AnalyzedTypes.get(type) || false;
  }

  const Type = Reflector(type);

  let should = false;
  if (Type.hasInterceptor() || Type.hasInterceptor() || Type.hasParameters()) {
    should = true;
  } else {
    for (const prop of Type.properties()) {
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

  AnalyzedTypes.set(type, should);
  return should;
}
