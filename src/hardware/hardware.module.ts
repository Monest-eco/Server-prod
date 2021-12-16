import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Esp32Entity } from '../esp32/esp32';
import { HardwareController } from './hardware.controller';
import { HardwareService } from './hardware.service';

@Module({
  imports: [TypeOrmModule.forFeature([Esp32Entity])],
  controllers: [HardwareController],
  providers: [HardwareService],
})
export class HardwareModule {}
