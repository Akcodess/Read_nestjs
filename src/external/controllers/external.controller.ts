import { Controller } from '@nestjs/common';
import { ExternalService } from '../services/external.service';

@Controller('external')
export class ExternalController {
  constructor(private readonly service: ExternalService) {}
}
