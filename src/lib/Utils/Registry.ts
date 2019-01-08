import { Constructor } from 'agentframework';

export class SingletonRegistry {
  private instances = new WeakMap<Constructor, any>();

  get<T>(type: Constructor<T>): T | undefined {
    if (!this.instances.has(type)) {
      return undefined;
    }
    return this.instances.get(type);
  }

  set<T>(type: Constructor<T>, instance: T): void {
    if (this.instances.has(type)) {
      throw new Error('InstanceAlreadyExist');
    }
    this.instances.set(type, instance);
  }

  delete<T>(type: Constructor<T>) {
    this.instances.delete(type);
  }
}

export class TypeRegistry {
  private types = new WeakMap<Constructor, Constructor>();

  get<T extends object>(type: Constructor<T>): Constructor<T> | undefined {
    if (!this.types.has(type)) {
      return undefined;
    }
    return <Constructor<T>>this.types.get(type);
  }

  set<T>(type: Constructor<T>, instance: Constructor<T>): void {
    if (this.types.has(type)) {
      throw new Error('InstanceAlreadyExist');
    }
    this.types.set(type, instance);
  }

  delete<T>(type: Constructor<T>) {
    this.types.delete(type);
  }
}
