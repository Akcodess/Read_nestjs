import { Controller } from '@nestjs/common';
import { GravityService } from './gravity.service';

@Controller('gravity')
export class GravityController {
  constructor(private readonly service: GravityService) {}
}

