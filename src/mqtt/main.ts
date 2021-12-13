import * as mqtt from 'mqtt';

/**
 * Create and run MQTT server with nest
 */
// export async function MQTTServer(): Promise<void> {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     MqttAppModule,
//     {
//       transport: Transport.MQTT,
//       options: {
//         url: 'mqtt://cyrilserver.ddns.net:25565',
//       },
//     },
//   );
//   app.listen();
// }

const host = 'cyrilserver.ddns.net';
const port = '25565';

/**
 * Create and run MQTT client
 */
export function MQTTClient(): void {
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
  });
}
