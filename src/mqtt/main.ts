import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';

export async function MQTTServer(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
        clientId: 'mqtt-server',
        username: 'mqtt-server',
        password: 'mqtt-server',
      },
    },
  );
}
