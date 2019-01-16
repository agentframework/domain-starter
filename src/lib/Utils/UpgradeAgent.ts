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

import { Constructor, Agent, IsAgent } from '../lib';
import { ShouldUpgradeType } from './ShouldUpgradeType';

export function UpgradeAgent<T>(type: Constructor<T>): Constructor<T> {
  // type is already upgrade to agent
  if (IsAgent(type)) {
    return type;
  }
  // upgrade to Agent only if interceptor or initializer found
  if (ShouldUpgradeType(type)) {
    return Agent(type);
  }
  // do not upgrade
  return type;
}
