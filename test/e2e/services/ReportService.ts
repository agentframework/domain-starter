import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';
import { CommonService } from './CommonService';
import { DocumentService } from './DocumentService';
import { WorkflowService } from './WorkflowService';
import { EmbassyService } from './EmbassyService';
import { QuotaService } from './QuotaService';

export class ReportService {
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
  embassy: EmbassyService;
}
