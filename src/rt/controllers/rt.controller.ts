import { Controller } from '@nestjs/common';
import { RtService } from '../services/rt.service';

@Controller('rt')
export class RtController {
  constructor(private readonly service: RtService) {}
}
