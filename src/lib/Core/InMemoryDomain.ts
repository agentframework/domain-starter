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

import { Domain } from './Domain';
import { construct } from './Factory/TypeFactory';
import { AnyConstructor } from './Factory/AnyConstructor';
import { IAttribute } from 'agentframework';

export class InMemoryDomain extends Domain {
  public disposed: boolean;
  public disposing: boolean;
  private readonly _parent?: Domain;
  private readonly _types = new Map<Function, AnyConstructor<any>>();
  private readonly _agents = new Map<AnyConstructor<any>, any>();

  constructor(parent?: Domain) {
    super();
    if (parent) this._parent = parent;
    this.addType(Domain, InMemoryDomain);
    this.addAgent(Domain, this);
  }

  //region Type
  public addType<T extends object>(type: Function, replacement: AnyConstructor<T>): void {
    if (this._types.has(type)) {
      throw new TypeError('TypeAlreadyAdded');
    }
    this._types.set(type, replacement);
  }

  public getType<T extends object>(type: Function): AnyConstructor<T> | undefined {
    return this._types.has(type) ? this._types.get(type) : this._parent && this._parent.getType<T>(type);
  }

  public getTypes<T extends object>(): Iterator<AnyConstructor<T>> {
    return this._types.values();
  }

  public hasType(type: Function): boolean {
    return this._types.has(type);
  }

  public deleteType(type: Function): void {
    this._types.delete(type);
  }
  //endregion

  //region Agent
  public getAgent<T extends object>(type: AnyConstructor<T>): T | undefined {
    return this._agents.get(type);
  }

  public hasAgent<T extends object>(type: AnyConstructor<T>): boolean {
    return this._agents.has(type);
  }

  public addAgent<T extends object>(type: AnyConstructor<T>, agent: T): void {
    if (this._agents.has(type)) {
      throw new Error('AgentAlreadyExists');
    }
    this._agents.set(type.prototype.constructor, agent);
  }

  public replaceAgent<T extends object>(type: AnyConstructor<T>, origin: T, replace: T): void {
    if (!this._agents.has(type) || this._agents.get(type) !== origin) {
      throw new Error('OriginAgentNotMatch');
    }
    this._agents.set(type, replace);
  }

  public deleteAgent<T extends object>(type: AnyConstructor<T>, agent: T): boolean {
    if (this._agents.has(type) && this._agents.get(type) === agent) {
      this._agents.delete(type);
      return true;
    }
    return false;
  }
  //endregion

  //region Factory
  public construct<T extends object>(target: AnyConstructor<T>, params: ArrayLike<any>, transit?: boolean): T {
    const type = this.getType<T>(target) || target;
    const newCreated = construct<T>(type, params, this);
    if (newCreated instanceof Promise) {
      throw new Error('NotAllowAsyncConstructor');
    } else {
      !transit && this.addAgent(type, newCreated);
      return newCreated;
    }
  }

  public resolve<T extends object>(target: AnyConstructor<T>, params: ArrayLike<any>): Promise<T> {
    const type = this.getType<T>(target) || target;
    const newCreated = construct(type, params, this);
    // prevent double resolve
    this.addAgent(type, newCreated);
    if (newCreated instanceof Promise) {
      return newCreated.then(
        newResolved => {
          this.replaceAgent(type, newCreated, newResolved);
          return newResolved;
        },
        err => {
          this.deleteAgent(type, <any>newCreated);
          throw err;
        }
      );
    } else {
      return Promise.resolve(newCreated);
    }
  }
  //endregion

  public beforeDecorate(attribute: IAttribute, target: Function): boolean {
    return false;
  }

  public dispose(): void {
    if (this.disposing) {
      return;
    }
    this.disposing = true;
    this._types.clear();
    this._agents.clear();
    this.disposed = true;
  }
}
