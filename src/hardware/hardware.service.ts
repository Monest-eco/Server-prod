import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Esp32Entity } from '../esp32/esp32';
import { Repository } from 'typeorm';

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Esp32Entity)
    private esp32Repository: Repository<Esp32Entity>,
  ) {}

  public findAll(): Promise<Esp32Entity[]> {
    return this.esp32Repository.find();
  }
}
