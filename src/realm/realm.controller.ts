import { Controller } from '@nestjs/common';
import { RealmService } from './realm.service';

@Controller('realm')
export class RealmController {
  constructor(private readonly service: RealmService) {}
}
