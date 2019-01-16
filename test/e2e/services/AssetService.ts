import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';

export class AssetService {
  @inject()
  idm: IdentityService;
}
