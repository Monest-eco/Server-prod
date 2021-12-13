import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MqttAppModule } from './mqttapp.module';

/**
 * Create and run MQTT server
 */
export async function MQTTServer(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MqttAppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    },
  );
}
