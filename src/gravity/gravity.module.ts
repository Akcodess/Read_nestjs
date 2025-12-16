import { Module } from '@nestjs/common';
import { GravityController } from './gravity.controller';
import { GravityService } from './gravity.service';

@Module({
  controllers: [GravityController],
  providers: [GravityService],
  exports: [GravityService],
})
export class GravityModule {}

