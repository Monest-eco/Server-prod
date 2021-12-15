import { NestFactory } from '@nestjs/core';
import { devicesName } from './@types/fakeData';
import { AppModule } from './app.module';
import { generateFakeData } from './fakeData';
import { MQTTClient } from './mqtt/main';
import { config } from 'dotenv';
import { generateSwaggerDoc } from './swagger/swagger';

// Get env variables
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateSwaggerDoc(app);
  await app.listen(process.env.PORT || 8080);
}

if (process.env.STATUS === 'data') {
  console.log('🚀 => Starting fake data...');
  for (const item of devicesName) {
    console.log(`=> Generating data for ${item.name}`);
    generateFakeData(1000, item);
  }
} else if (process.env.STATUS === 'mqtt') {
  console.log('🚀 => Starting MQTT client...');
  MQTTClient();
} else {
  console.log('🚀 => Starting server...');
  bootstrap();
}
