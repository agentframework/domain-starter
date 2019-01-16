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

import { ClassInitializer } from '../ClassInitializer';
import { ClassFinalizer } from '../ClassFinalizer';

export interface ClassConstructor<T extends object> {
  new (...args: Array<any>): T;
  [ClassInitializer]?(...args: Array<any>): T | Promise<T>;
  [ClassFinalizer]?(instance: T, ...args: Array<any>): T | Promise<T>;
}

export type AbstractClassConstructor<T extends object> = Function & {
  prototype: T;
  [ClassInitializer]?(...args: Array<any>): T | Promise<T>;
  [ClassFinalizer]?(instance: T, ...args: Array<any>): T | Promise<T>;
};

export type AnyConstructor<T extends object> = ClassConstructor<T> | AbstractClassConstructor<T>;
