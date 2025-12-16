import { Controller } from '@nestjs/common';

import { LightService } from './light.service';

@Controller('light')
export class LightController {
  constructor(private readonly service: LightService) {}
}
