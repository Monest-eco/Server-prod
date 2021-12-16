import { Controller, Get } from '@nestjs/common';
import { Esp32Entity } from '../esp32/esp32';
import { HardwareService } from './hardware.service';

@Controller('hardware')
export class HardwareController {
  constructor(public service: HardwareService) {}

  @Get('/esp32/all')
  async getAll(): Promise<Esp32Entity[]> {
    return this.service.findAll();
  }
}
