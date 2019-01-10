import { TypeConstructor } from './TypeConstructor';
import { IAttribute } from './lib';
import { AgentRegistry } from './AgentRegistry';

export abstract class Domain {
  // identify
  abstract id: number;

  // factory methods
  abstract construct<T extends object>(type: TypeConstructor<T>, params: ArrayLike<any>, transit?: boolean): T;
  abstract resolve<T extends object>(type: TypeConstructor<T>, params: ArrayLike<any>, transit?: boolean): Promise<T>;

  // hook
  abstract onBeforeDecorateHook(attribute: IAttribute, target: Function): boolean;

  // decorators
  abstract getClassAttribute(): IAttribute;

  // storage
  protected abstract registry: AgentRegistry;

  static local: Domain;
}
