import { Module } from '@nestjs/common';
import { AudioProcessingService } from './audio-processing.service';

@Module({
  providers: [AudioProcessingService]
})
export class AudioProcessingModule {}

