import { Controller } from '@nestjs/common';
import { CallSummaryCampaignWiseService } from '../services/call-summary-campaign-wise.service';

@Controller('call/summary/campaign-wise')
export class CallSummaryCampaignWiseController {
  constructor(private readonly service: CallSummaryCampaignWiseService) {}
}
