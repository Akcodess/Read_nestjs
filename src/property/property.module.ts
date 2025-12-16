import { Module } from '@nestjs/common';

import PropertyService from './services/property.service';
import { PropertiesController } from './controllers/properties.controller';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertyService, LoggerService],
  exports: [PropertyService],
})
export class PropertyModule {}
