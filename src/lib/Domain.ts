import { SingletonRegistry, TypeRegistry } from './Utils/Registry';
import { CreateAgent } from './Utils/UpgradeAgent';
import { Initializer, Finalizer, TypeConstructor, checkTypeConstructor, checkTypeInstance } from './Initializer';
import { Constructor } from 'agentframework';

export class Domain {
  private readonly types = new TypeRegistry();
  private readonly instances = new SingletonRegistry();
  private readonly parent?: Domain;
  private readonly params: Array<any>;

  constructor(params?: Array<any>, parent?: Domain) {
    this.params = params || [this];
    this.parent = parent;
  }

  private getTypeOf<T extends object>(type: TypeConstructor<T>): TypeConstructor<T> {
    return (this.parent && this.parent.getTypeOf(type)) || this.types.get(type) || type;
  }

  private initialize<T extends object>(type: TypeConstructor<T>, params?: ArrayLike<any>): T {
    const target = this.getTypeOf(type);
    checkTypeConstructor(target);
    const initializer = target[Initializer];
    let initialized;

    // params = params ? this.params.concat(Array.prototype.slice.call(params, 0)) : this.params;
    params = params || this.params;

    // console.log('======', this.params);
    // console.log('+++++++++', params);

    if (initializer) {
      initialized = Reflect.apply(initializer, target, params);
    } else {
      initialized = CreateAgent(target, params);
    }
    checkTypeInstance(initialized);
    return initialized;
  }

  private finalize<T extends object>(instance: T, type: TypeConstructor<T>): any {
    const target = this.getTypeOf(type);
    const finalizer = target[Finalizer];
    if (finalizer) {
      return Reflect.apply(finalizer, target, [instance]);
    }
    for (const key of Object.keys(instance)) {
      Reflect.deleteProperty(instance, key);
    }
  }

  construct<T extends object>(type: TypeConstructor<T>, params?: ArrayLike<any>): T {
    let o = this.instances.get(type);
    if ('undefined' === typeof o) {
      o = this.initialize(type, params);
      this.instances.set(type, o);
    }
    return o!;
  }

  resolve<T extends object>(type: TypeConstructor<T>, params?: ArrayLike<any>): Promise<T> {
    let o = this.instances.get(type);
    if ('undefined' === typeof o) {
      o = this.initialize(type, params);
      if (o instanceof Promise) {
        return o.then(newCreated => {
          this.instances.set(type, o);
          return newCreated;
        });
      } else {
        this.instances.set(type, o);
      }
    }
    return Promise.resolve(o);
  }

  destruct<T extends object>(instance: T, type: TypeConstructor<T>): void {
    let o = this.instances.get(type);
    if (o !== instance) {
      throw new TypeError('NotAllowToDestructForeignInstance');
    }
    this.instances.delete(type);
    this.finalize(instance, type);
  }

  release<T extends object>(instance: T, type: Constructor<T>): Promise<void> {
    let o = this.instances.get(type);
    if (o !== instance) {
      throw new TypeError('NotAllowToReleaseForeignInstance');
    }
    this.instances.delete(type);
    return this.finalize(instance, type);
  }
}

export const Root = new Domain();
