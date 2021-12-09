import { NestFactory } from '@nestjs/core';
import { devicesName } from '../@types/fakeData';
import { AppModule } from './app.module';
import { generateFakeData } from './fakeData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080);
}

if (process.env.STATUS === 'data') {
  for (const item of devicesName) {
    generateFakeData(1000, item);
  }
} else {
  bootstrap();
}
