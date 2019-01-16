import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';

export class CommonService {
  @inject()
  idm: IdentityService;
}
