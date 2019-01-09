import { agent } from 'agentframework';
import { inject } from '../../src/lib';

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

