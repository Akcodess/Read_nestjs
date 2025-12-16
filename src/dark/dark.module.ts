import { Module } from '@nestjs/common';
import { DarkController } from './dark.controller';
import { DarkService } from './dark.service';

@Module({
  controllers: [DarkController],
  providers: [DarkService],
  exports: [DarkService],
})
export class DarkModule {}
