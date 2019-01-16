import { agent } from 'agentframework';
import { InMemoryDomain, singleton } from '../../../src/lib';
import { AssetService } from '../services/AssetService';
import { ErpService } from '../services/ErpService';
import { WageService } from '../services/WageService';

@agent()
class Website {
  @singleton()
  asset: AssetService;
  
  @singleton()
  erp: ErpService;
  
  @singleton()
  wage: WageService;
}

describe('Domain Tests', () => {
  describe('#Website()', () => {
    it('should get same instance', () => {
      const req = new InMemoryDomain();
      const web = req.construct(Website, [3, 3, 3], true);
      console.log('#3 started', web);
    });
  });
});
