import { Global, Module } from '@nestjs/common';
import { CommonController } from './controllers/common.controller';
import { CommonService } from './services/common.service';
import { WINSTON_LOGGER, createWinstonLogger } from './logger';
import { LoggerService } from './logger/logger.service';

@Module({
  controllers: [CommonController],
  providers: [
    CommonService,
    LoggerService,
    {
      provide: WINSTON_LOGGER,
      useFactory: () => createWinstonLogger(),
    },
  ],
  exports: [CommonService, LoggerService, WINSTON_LOGGER],
})
@Global()
export class CommonModule {}
