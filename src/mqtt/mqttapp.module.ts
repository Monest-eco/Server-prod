import { Module } from '@nestjs/common';
import { MqttAppController } from './mqttapp.controller';

@Module({
  controllers: [MqttAppController],
})
export class MqttAppModule {}
