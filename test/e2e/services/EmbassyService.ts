import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';
import { CommonService } from './CommonService';
import { DocumentService } from './DocumentService';
import { WorkflowService } from './WorkflowService';
import { QuotaService } from './QuotaService';
import { NotificationService } from './NotificationService';

export class EmbassyService {
  @inject()
  idm: IdentityService;
  @inject()
  common: CommonService;
  @inject()
  dm: DocumentService;
  @inject()
  workflow: WorkflowService;
  @inject()
  quota: QuotaService;
  @inject()
  notify: NotificationService;
}
