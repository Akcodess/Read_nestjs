import { Module } from '@nestjs/common';
import { ExternalController } from './controllers/external.controller';
import { ExternalService } from './services/external.service';

@Module({
  controllers: [ExternalController],
  providers: [ExternalService],
  exports: [ExternalService],
})
export class ExternalModule {}
