import * as mqtt from 'mqtt';
import { Esp32Data } from 'src/@types/esp32';
import { Esp32Entity } from 'src/esp32/esp32';
import { Esp32Service } from 'src/esp32/esp32.service';
import { createConnection, Connection } from 'typeorm';

const host = 'cyrilserver.ddns.net';
const port = '25565';
let connection: Connection;

async function connectToDatabase() {
  try {
    connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dashboard',
      entities: [Esp32Entity],
      name: 'monest',
    });
    console.log('Connected to database');
  } catch (err) {
    console.error('error: ', err);
  }
}

/**
 * Create and run MQTT client
 */
export async function MQTTClient() {
  await connectToDatabase();
  const esp = new Esp32Service();
  const client = mqtt.connect(`mqtt://${host}:${port}`, {
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on('connect', () => {
    console.log('Connected');
    client.subscribe(['esp32/watt'], () => {
      console.log(`Subscribe to 'esp32/watt' '${'esp32/watt'}'`);
    });
  });
  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    const data: Esp32Data = {
      date: new Date(),
      watt: parseInt(payload.toString(), 10),
    };
    esp.create(data);
  });
}
