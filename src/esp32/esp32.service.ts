import { Esp32Data } from 'src/@types/esp32';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Esp32Entity } from './esp32';

@EntityRepository(Esp32Entity)
export class Esp32Repository extends Repository<Esp32Entity> {}

export class Esp32Service {
  private esp32Repository: Esp32Repository;

  constructor() {
    this.esp32Repository =
      getConnection('monest').getCustomRepository(Esp32Repository);
  }

  public create(data: Esp32Data) {
    console.log('create', data);
    try {
      const res = this.esp32Repository.save({
        data_esp32: data.watt,
        // user_id: 1,
        // date_esp32: data.date,
      });
      console.log('res: ', res);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
