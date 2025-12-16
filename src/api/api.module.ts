import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { ServicesController } from './controllers/services.controller';
import { ApiService } from './services/api.service';

@Module({
  controllers: [ApiController, ServicesController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}

