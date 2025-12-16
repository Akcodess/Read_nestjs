import { Module } from '@nestjs/common';
import { ScreenRecordingController } from './controllers/screen-recording.controller';
import { ScreenRecordingService } from './services/screen-recording.service';

@Module({
  controllers: [ScreenRecordingController],
  providers: [ScreenRecordingService],
  exports: [ScreenRecordingService],
})
export class ScreenRecordingModule {}
