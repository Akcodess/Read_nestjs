import { Controller } from '@nestjs/common';
import { CallSummaryInboundService } from '../services/call-summary-inbound.service';

@Controller('call/summary/inbound')
export class CallSummaryInboundController {
  constructor(private readonly service: CallSummaryInboundService) {}
}
