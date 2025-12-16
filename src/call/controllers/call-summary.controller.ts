import { Controller } from '@nestjs/common';
import { CallSummaryService } from '../services/call-summary.service';

@Controller('call/summary')
export class CallSummaryController {
  constructor(private readonly service: CallSummaryService) {}
}
