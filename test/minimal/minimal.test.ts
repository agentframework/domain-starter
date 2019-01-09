import { Domain } from '../../src/lib';
import { Car } from './agents';

describe('Hello Tests', () => {
  describe('#world()', () => {
    it('should get same instance', () => {
      const req = new Domain();

      const car = req.construct(Car, [1, 2, 3]);

      expect(car.services.start()).toBeTruthy();
    });
  });
});
