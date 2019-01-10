import { agent } from 'agentframework';
import { singleton, transit, Domain } from './lib';

class CarService {
  constructor(a: number, b: number, c: number, d?: any) {
    console.log('CarService(', a, b, c, d, ')');
  }

  start() {
    console.log('staring');
    return true;
  }
}


@agent()
class Car {
  constructor(a: number, b: number, c: number, d?: any) {
    console.log('Car(', a, b, c, d, ')');
    // the last parameter is current domain
  }

  @transit()
  service1: CarService;

  @transit()
  service2: CarService;

  @singleton()
  service3: CarService;

  @singleton()
  service4: CarService;

  @singleton()
  service5: CarService;
}

// const car = new Car(1, 2, 3);

// console.log('created car 1', car);

// console.log('started 1', car.service1.start());
// console.log('started 2', car.service2.start());
// console.log('#1 started 3', car.service3.start());
// console.log('#1 started 4', car.service4.start());
// console.log('#1 started 5', car.service5.start());

// const car2 = new Car(1, 2, 3);
// console.log('created car 2', car2);
// console.log('car 2 started 1', car2.service1.start());
// console.log('car 2 started 2', car2.service2.start());
// console.log('#2 started 3', car2.service3.start());
// console.log('#2 started 4', car2.service4.start());
// console.log('#2 started 5', car2.service5.start());

const req = new Domain();
const car3 = req.construct(Car, [3, 3, 3], true);

console.log('#3 started', car3.service3.start());

const car4 = req.construct(Car, [4, 5, 6], true);

console.log('#4 started', car4.service3.start());
