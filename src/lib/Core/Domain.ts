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

import { AnyConstructor } from './Factory/AnyConstructor';
import { IAttribute } from '../lib';

export abstract class Domain {
  
  /**
   * Return true if this domain been disposing
   */
  abstract disposing: boolean;

  /**
   * Return true if this domain been disposed
   */
  abstract disposed: boolean;

  /**
   * Called before decorate the domain specified attribute to a class
   */
  abstract beforeDecorate(attribute: IAttribute, target: Function): boolean;

  /**
   * Dispose domain and release all agents
   */
  abstract dispose(): void;

  //region Factory
  /**
   * Create an agent
   */
  abstract construct<T extends object>(type: AnyConstructor<T>, params?: ArrayLike<any>, transit?: boolean): T;

  /**
   * Resolve an agent using factory method
   */
  abstract resolve<T extends object>(type: AnyConstructor<T>, params?: ArrayLike<any>, transit?: boolean): Promise<T>;

  //endregion

  //region Type
  /**
   * Get constructor for current type
   */
  abstract getType<T extends object>(type: Function): AnyConstructor<T> | undefined;

  /**
   * Get constructors
   */
  abstract getTypes<T extends object>(): Iterator<AnyConstructor<T>>;

  /**
   * Check if have type registered
   */
  abstract hasType(type: Function): boolean;

  /**
   * Register type
   */
  abstract addType<T extends object>(type: Function, replacement: AnyConstructor<T>): void;

  /**
   * Delete type mapping for giving type
   */
  abstract deleteType(type: Function): void;
  //endregion

  //region Agent
  /**
   * Get agent
   */
  abstract getAgent<T extends object>(type: AnyConstructor<T>): T | undefined;

  /**
   * Check if have agent
   */
  abstract hasAgent<T extends object>(type: AnyConstructor<T>): boolean;

  /**
   * Add an agent
   */
  abstract addAgent<T extends object>(type: AnyConstructor<T>, agent: T): void;

  /**
   * Replace agent, throw error if origin agent not match
   */
  abstract replaceAgent<T extends object>(type: AnyConstructor<T>, origin: T, replace: T): void;

  /**
   * Delete agent. do nothing if agent not match
   */
  abstract deleteAgent<T extends object>(type: AnyConstructor<T>, agent: T): boolean;
  //endregion
}
