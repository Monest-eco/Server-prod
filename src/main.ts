import { NestFactory } from '@nestjs/core';
import { devicesName } from './@types/fakeData';
import { AppModule } from './app.module';
import { generateFakeData } from './fakeData';
import { MQTTClient } from './mqtt/main';
import { config } from 'dotenv';
import { generateSwaggerDoc } from './swagger/swagger';
import { MonestError } from './errors/monestError';

// Get env variables
config();
MonestError.checkEnvValue();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  generateSwaggerDoc(app);
  await app.listen(process.env.PORT || 8080);
}

if (process.env.TYPE === 'data') {
  console.log('🚀 => Starting fake data...');
  for (const item of devicesName) {
    console.log(`=> Generating data for ${item.name}`);
    generateFakeData(1000, item);
  }
} else if (process.env.TYPE === 'mqtt') {
  console.log('🚀 => Starting MQTT client...');
  MQTTClient();
} else {
  console.log('🚀 => Starting server...');
  bootstrap();
}
