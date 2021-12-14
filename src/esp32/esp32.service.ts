import { Esp32Data } from 'src/@types/esp32';
import { getConnection, Repository } from 'typeorm';
import { Esp32Entity } from './esp32';

export class Esp32Repository extends Repository<Esp32Entity> {}

export class Esp32Service {
  private esp32Repository: Esp32Repository;

  constructor() {
    this.esp32Repository = getConnection('monest').getRepository(Esp32Entity);
  }

  public create(data: Esp32Data) {
    console.log('create', data);
    try {
      const res = this.esp32Repository.create({
        user_id: 1,
        data_esp32: data.watt,
        date_esp32: data.date,
      });
      console.log('res: ', res);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
