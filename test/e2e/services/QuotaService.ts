import { inject } from '../../../src/lib';
import { IdentityService } from './IdentityService';
import { CommonService } from './CommonService';
import { ImmigrationService } from './ImmigrationService';
import { DocumentService } from './DocumentService';
import { WorkflowService } from './WorkflowService';
import { EmbassyService } from './EmbassyService';
import { ReportService } from './ReportService';

export class QuotaService {
  @inject()
  idm: IdentityService;
  @inject()
  common: CommonService;

  @inject()
  imm: ImmigrationService;

  @inject()
  dm: DocumentService;

  @inject()
  workflow: WorkflowService;

  @inject()
  embassy: EmbassyService;

  @inject()
  report: ReportService;
}
