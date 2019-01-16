import { agent } from 'agentframework';
import { inject, InMemoryDomain } from '../../src/lib';

class Fruit {
  canEat(): boolean {
    throw new Error('not implemented');
  }
}

class CO2 {
  constructor() {
    console.log('CO2 ctor', arguments);
  }

  canEat(): boolean {
    return false;
  }
}

class Apple extends Fruit {
  @inject()
  co2: CO2;

  constructor() {
    super();
    console.log('Apple ctor', arguments);
  }

  public canEat(): boolean {
    return this.co2.canEat();
  }
}

@agent()
class StoreAgent {
  constructor(...args: Array<any>) {
    console.log('Store ctor', arguments);
  }

  @inject()
  apple: Apple;
}

const a = new StoreAgent(1, 2, 3, 4, 5);

console.log('Store =', a);
console.log('Store.apple =', a.apple);
console.log('Store.apple.canEat() =', a.apple.canEat());

class Store {
  constructor(...args: Array<any>) {
    console.log('Store ctor', arguments);
  }

  @inject()
  apple: Apple;

  getTheName() {}
}

const d = new InMemoryDomain();

const store = d.construct(Store, [d, 1, 2, 3]);
//
console.log('Store2 =', store);
console.log('Store2.apple =', store.apple);
console.log('Store2.apple.canEat() =', store.apple.canEat());
