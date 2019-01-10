import { Domain } from '../../src/lib';
import { AsyncCar, Car, SyncCar } from './agents';

describe('Domain Tests', () => {
  describe('#Car()', () => {
    it('should get same instance', () => {
      const req = new Domain();

      const car = req.construct(Car, [1, 2, 3]);

      expect(car.services.start()).toBeTruthy();
    });
  });

  describe('#SyncCar()', () => {
    it('should get same instance', () => {
      const req = new Domain();

      const car = req.construct(SyncCar, [1, 2, 3]);

      expect(car.services.start()).toBeTruthy();
    });
  });
  
  
  describe('#AsyncCar()', () => {
    it('should get same instance', () => {
      const req = new Domain();
      expect(() => {
        req.construct(AsyncCar, [1, 2, 3]);
      }).toThrow();
    });
  });
});
