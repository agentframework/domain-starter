import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';
import { CommonService } from './CommonService';
import { ReportService } from './ReportService';
import { WorkflowService } from './WorkflowService';

export class NotificationService {
  @inject()
  idm: IdentityService;
  @inject()
  common: CommonService;
  @inject()
  report: ReportService;
  @inject()
  workflow: WorkflowService;
}
