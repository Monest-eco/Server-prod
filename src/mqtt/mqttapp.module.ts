import { Module } from '@nestjs/common';
import { MqttAppController } from './mqttapp.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://cyrilserver.ddns.net:25565',
        },
      },
    ]),
  ],
  controllers: [MqttAppController],
})
export class MqttAppModule {}
