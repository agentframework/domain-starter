import { inject } from '../../../src/lib';
import { CommonService } from './CommonService';
import { ImmigrationService } from './ImmigrationService';
import { NotificationService } from './NotificationService';
import { ReportService } from './ReportService';

export class IdentityService {
  @inject()
  common: CommonService;
  @inject()
  imm: ImmigrationService;
  @inject()
  notify: NotificationService;
  @inject()
  report: ReportService;
}
