import { Module } from '@nestjs/common';
import { NucleusController } from './nucleus.controller';
import { NucleusService } from './nucleus.service';

@Module({
  controllers: [NucleusController],
  providers: [NucleusService],
  exports: [NucleusService],
})
export class NucleusModule {}
