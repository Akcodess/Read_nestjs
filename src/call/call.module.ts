import { Module } from '@nestjs/common';
import { CallSummaryService } from './services/call-summary.service';
import { CallSummaryCampaignWiseService } from './services/call-summary-campaign-wise.service';
import { CallSummaryInboundService } from './services/call-summary-inbound.service';
import { CallSummaryProjectWiseService } from './services/call-summary-project-wise.service';
import { AbandonCallHistoryService } from './services/abandon-call-history.service';
import { CallSummaryController } from './controllers/call-summary.controller';
import { CallSummaryCampaignWiseController } from './controllers/call-summary-campaign-wise.controller';
import { CallSummaryInboundController } from './controllers/call-summary-inbound.controller';
import { CallSummaryProjectWiseController } from './controllers/call-summary-project-wise.controller';
import { AbandonCallHistoryController } from './controllers/abandon-call-history.controller';

@Module({
  providers: [
    CallSummaryService,
    CallSummaryCampaignWiseService,
    CallSummaryInboundService,
    CallSummaryProjectWiseService,
    AbandonCallHistoryService,
  ],
  exports: [
    CallSummaryService,
    CallSummaryCampaignWiseService,
    CallSummaryInboundService,
    CallSummaryProjectWiseService,
    AbandonCallHistoryService,
  ],
  controllers: [
    CallSummaryController,
    CallSummaryCampaignWiseController,
    CallSummaryInboundController,
    CallSummaryProjectWiseController,
    AbandonCallHistoryController,
  ],
})
export class CallModule {}
