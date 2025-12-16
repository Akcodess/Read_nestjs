import { Controller } from '@nestjs/common';
import { LeadsService } from '../services/leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly service: LeadsService) {}
}
