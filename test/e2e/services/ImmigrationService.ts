import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';
import { CommonService } from './CommonService';

export class ImmigrationService {
  @inject()
  idm: IdentityService;
  @inject()
  common: CommonService;
}
