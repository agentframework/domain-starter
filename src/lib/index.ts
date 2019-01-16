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

export { Domain } from './Core/Domain';
export { GetDomain } from './Utils/Cache';
export { InMemoryDomain } from './Core/InMemoryDomain';
export { ClassConstructor } from './Core/Factory/AnyConstructor';
export { ClassInitializer } from './Core/ClassInitializer';
export { ClassFinalizer } from './Core/ClassFinalizer';

export { InjectAttribute } from './Attributes/InjectAttribute';
export { inject } from './Decorators/inject';
export { DomainAttribute } from './Attributes/DomainAttribute';
export { domain } from './Decorators/domain';
export { SingletonAttribute } from './Attributes/SingletonAttribute';
export { singleton } from './Decorators/singleton';
export { TransitAttribute } from './Attributes/TransitAttribute';
export { transit } from './Decorators/transit';
