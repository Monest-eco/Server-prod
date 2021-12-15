import config from 'src/configs/deafult.config';
import { Esp32Entity } from 'src/esp32/esp32';
import { Connection, createConnection } from 'typeorm';

export async function connectToDatabase(): Promise<Connection> {
  try {
    console.log('🚀 => Start database connection...');
    const connect = await createConnection({
      type: 'postgres',
      host: process.env.STATUS === 'prod' ? config.database.url : 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Esp32Entity],
      name: 'monest',
    });
    console.log('✅ => Connected to database !');
    return connect;
  } catch (err) {
    console.error('❌ => error: ', err);
  }
}
