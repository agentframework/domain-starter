import { Domain, inject } from '../../src/lib';

class Logger {
  log(str: string) {
    console.log(str);
  }
}

class App {
  @inject()
  logger: Logger;
}

describe('Hello Tests', () => {
  describe('#world()', () => {
    it('should get same instance', () => {
      const d = new Domain();
      const app = d.construct(App);
      expect(app instanceof App).toBeTruthy();
    });
  });
});
