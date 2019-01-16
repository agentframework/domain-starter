import { inject } from '../../../src/lib';
import { CommonService } from './CommonService';
import { IdentityService } from './IdentityService';

export class ErpService {
  @inject()
  idm: IdentityService;
  @inject()
  common: CommonService;
}
