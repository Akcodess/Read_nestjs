import { Controller } from '@nestjs/common';
import { AbandonCallHistoryService } from '../services/abandon-call-history.service';

@Controller('call/abandon-call-history')
export class AbandonCallHistoryController {
  constructor(private readonly service: AbandonCallHistoryService) {}
}
