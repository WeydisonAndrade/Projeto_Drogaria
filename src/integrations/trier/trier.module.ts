import { Module } from '@nestjs/common';
import { TrierService } from './trier.service';
import { TrierController } from './trier.controller';

@Module({
  controllers: [TrierController],
  providers: [TrierService]
})
export class TrierModule {}

