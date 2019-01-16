import { IdentityService } from './IdentityService';
import { CommonService } from './CommonService';
import { QuotaService } from './QuotaService';
import { inject } from '../../../src/lib';

export class WorkflowService {
  @inject()
  idm: IdentityService;
  @inject()
  common: CommonService;
  @inject()
  quota: QuotaService;
}
