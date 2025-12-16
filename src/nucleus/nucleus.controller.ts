import { Controller } from '@nestjs/common';
import { NucleusService } from './nucleus.service';

@Controller('nucleus')
export class NucleusController {
  constructor(private readonly service: NucleusService) {}
}
