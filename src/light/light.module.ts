import { Module } from '@nestjs/common';
import { LightController } from './light.controller';
import { LightService } from './light.service';

@Module({
  controllers: [LightController],
  providers: [LightService],
  exports: [LightService],
})
export class LightModule { }
