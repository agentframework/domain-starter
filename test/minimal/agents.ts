import { agent } from 'agentframework';
import { transit, inject, TypeInitializer } from '../../src/lib';

export class CarService {
  constructor(a: number, b: number, c: number) {
    console.log('CarService(', a, b, c, ')');
  }

  start() {
    console.log('staring');
    return true;
  }
}

@agent()
export class Car {
  constructor(a: number, b: number, c: number) {
    console.log('Car(', a, b, c, ')');

    // the last parameter is current domain
  }

  @inject()
  services: CarService;
}

@agent()
export class SyncCar {
  @transit()
  @inject()
  services: CarService;

  constructor(a: number, b: number, c: number) {
    console.log('SyncCar(', a, b, c, ')');
  }

  static [TypeInitializer](...args: Array<any>): AsyncCar {
    return Reflect.construct(SyncCar, args);
  }
}

@agent()
export class AsyncCar {
  @inject()
  services: CarService;

  constructor(a: number, b: number, c: number) {
    console.log('AsyncCar(', a, b, c, ') = ', this.services.start());
  }

  static [TypeInitializer](...args: Array<any>): Promise<AsyncCar> {
    return Promise.resolve(Reflect.construct(AsyncCar, args));
  }
}
