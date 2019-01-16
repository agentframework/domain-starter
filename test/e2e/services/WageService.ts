import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';
import { QuotaService } from './QuotaService';
import { WorkflowService } from './WorkflowService';
import { NotificationService } from './NotificationService';

export class WageService {
  @inject()
  idm: IdentityService;
  @inject()
  quota: QuotaService;
  @inject()
  workflow: WorkflowService;
  @inject()
  notify: NotificationService;
}
