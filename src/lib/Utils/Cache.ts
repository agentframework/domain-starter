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

import { Domain } from '../Core/Domain';
import { AnyConstructor } from '../Core/Factory/AnyConstructor';

export const AnalyzedTypes = new WeakMap<AnyConstructor<object>, boolean>();

export const Domains = new WeakMap<object, Domain>();

export function GetDomain(agent: object): Domain | undefined {
  return Domains.get(agent);
}
