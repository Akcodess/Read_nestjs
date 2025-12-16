import { Controller } from '@nestjs/common';
import { ScreenRecordingService } from '../services/screen-recording.service';

@Controller('screen-recording')
export class ScreenRecordingController {
  constructor(private readonly service: ScreenRecordingService) {}
}
