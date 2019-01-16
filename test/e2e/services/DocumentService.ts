import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';

export class DocumentService {
  @inject()
  idm: IdentityService;
}
