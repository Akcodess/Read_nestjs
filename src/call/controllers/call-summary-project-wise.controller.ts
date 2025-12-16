import { Controller } from '@nestjs/common';
import { CallSummaryProjectWiseService } from '../services/call-summary-project-wise.service';

@Controller('call/summary/project-wise')
export class CallSummaryProjectWiseController {
  constructor(private readonly service: CallSummaryProjectWiseService) {}
}
