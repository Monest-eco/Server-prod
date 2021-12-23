import { Esp32Data } from 'src/@types/esp32';
import { Esp32Service } from 'src/esp32/esp32.service';
import { connectToDatabase } from './database/connect';
import { MqttController } from './mqtt';

/**
 * Create and run MQTT client
 */
export async function MQTTClient() {
  await connectToDatabase();
  const esp = new Esp32Service();
  const mqttEspClient = new MqttController();

  mqttEspClient.onConnect(() => {
    console.log('Connected');
    mqttEspClient.subscribe(['esp32/watt'], () => {
      console.log(`Subscribe to 'esp32/watt' '${'esp32/watt'}'`);
    });
  });

  mqttEspClient.onMessage((topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    const data: Esp32Data = {
      date: new Date(),
      watt: parseInt(payload.toString(), 10),
    };
    esp.create(data);
  });
}
