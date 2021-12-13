import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { devicesName } from './@types/fakeData';
import { AppModule } from './app.module';
import { generateFakeData } from './fakeData';
import { description, version, name } from './../package.json';
import { MQTTClient } from './mqtt/main';

/**
 * Generate swagger documenation
 * @param app Nest application
 */
function generateSwaggerDoc(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateSwaggerDoc(app);
  await app.listen(process.env.PORT || 8080);
}

if (process.env.STATUS === 'data') {
  for (const item of devicesName) {
    console.log(`=> Generating data for ${item.name}`);
    generateFakeData(1000, item);
  }
} else if (process.env.STATUS === 'mqtt') {
  MQTTClient();
} else {
  bootstrap();
}
