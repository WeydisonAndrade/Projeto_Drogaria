import { Module } from '@nestjs/common';
import { KommoService } from './kommo.service';
import { KommoController } from './kommo.controller';

@Module({
  controllers: [KommoController],
  providers: [KommoService]
})
export class KommoModule {}

