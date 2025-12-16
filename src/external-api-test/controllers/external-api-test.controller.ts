import { Controller } from '@nestjs/common';
import { ExternalApiTestService } from '../services/external-api-test.service';

@Controller('external-api-test')
export class ExternalApiTestController {
  constructor(private readonly service: ExternalApiTestService) {}
}
