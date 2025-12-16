import { Module } from '@nestjs/common';
import { ExternalApiTestController } from './controllers/external-api-test.controller';
import { ExternalApiTestService } from './services/external-api-test.service';

@Module({
  controllers: [ExternalApiTestController],
  providers: [ExternalApiTestService],
  exports: [ExternalApiTestService],
})
export class ExternalApiTestModule {}
