import { Module } from '@nestjs/common';
import { OrderProcessingService } from './order-processing.service';

@Module({
  providers: [OrderProcessingService]
})
export class OrderProcessingModule {}

