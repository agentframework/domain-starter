import { Domain } from './Domain';
import { construct } from './Factory/ClassFactory';
import { AnyConstructor } from './Factory/AnyConstructor';
import { IAttribute } from '../Dependencies';
import { Domains } from '../Utils/Cache';

export class InMemoryDomain extends Domain {
  public disposed: boolean;
  public disposing: boolean;
  private readonly _parent?: Domain;
  private readonly _types = new Map<Function, AnyConstructor<any>>();
  private readonly _agents = new Map<AnyConstructor<any>, any>();

  constructor(parent?: Domain) {
    super();
    if (parent) this._parent = parent;
    this.setType(Domain, new.target);
    this.addAgent(Domain, this, true);
  }

  //region Type
  public addType<T extends object>(type: AnyConstructor<T>): void {
    let proto = type.prototype;
    while (proto && proto !== Object.prototype) {
      const ctor = proto.constructor;
      if (!this._types.has(ctor)) {
        this._types.set(ctor, type);
        // console.log('set', ctor.name, ' ===> ', type.name);
      }
      proto = Object.getPrototypeOf(proto);
    }
  }

  public setType<T extends object>(type: Function, replacement: AnyConstructor<T>): void {
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
    return this._agents.has(type) ? this._agents.get(type) : this._parent && this._parent.getAgent<T>(type);
  }

  public hasAgent<T extends object>(type: AnyConstructor<T>): boolean {
    return this._agents.has(type);
  }

  public addAgent<T extends object>(type: AnyConstructor<T>, agent: T, explicit?: boolean): void {
    let proto = type.prototype;
    while (proto && proto !== Object.prototype) {
      const ctor = proto.constructor;
      if (!this._agents.has(ctor)) {
        this._agents.set(ctor, agent);
      }
      if (explicit) return;
      proto = Object.getPrototypeOf(proto);
    }
  }

  public setAgent<T extends object>(type: AnyConstructor<T>, agent: T): void {
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
    if (!transit && this.hasAgent(type)) {
      const exists = this.getAgent(type);
      if (exists !== undefined) {
        return exists;
      }
    }
    const agent = construct<T>(type, params, this);
    if (agent instanceof Promise) {
      throw new Error('NotAllowAsyncConstructor');
    } else {
      Domains.set(agent, this);
      if (!transit) this.addAgent(type, agent);
      return agent;
    }
  }

  public resolve<T extends object>(target: AnyConstructor<T>, params: ArrayLike<any>, transit?: boolean): Promise<T> {
    const type = this.getType<T>(target) || target;
    if (!transit && this.hasAgent(type)) {
      const exists = this.getAgent(type);
      if (exists !== undefined) {
        if (exists instanceof Promise) {
          return exists;
        }
        return Promise.resolve(exists);
      }
    }
    const newCreated: T | Promise<T> = construct(type, params, this);
    if (newCreated instanceof Promise) {
      this.addAgent(type, newCreated, true);
      return newCreated.then(
        agent => {
          Domains.set(agent, this);
          if (!transit) {
            this.replaceAgent(type, newCreated, agent);
            this.addAgent(type, agent);
          }
          return agent;
        },
        err => {
          if (!transit) this.deleteAgent(type, <any>newCreated);
          throw err;
        }
      );
    } else {
      Domains.set(newCreated, this);
      if (!transit) this.addAgent(type, newCreated);
      return Promise.resolve(newCreated);
    }
  }
  //endregion

  public beforeDecorate(attribute: IAttribute, target: Function): boolean {
    return true;
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
