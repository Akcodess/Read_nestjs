import { Module } from '@nestjs/common';
import { RtController } from './controllers/rt.controller';
import { RtService } from './services/rt.service';

@Module({
  controllers: [RtController],
  providers: [RtService],
  exports: [RtService],
})
export class RtModule {}
