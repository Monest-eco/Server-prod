import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateFakeData } from './fakeData';

async function bootstrap() {
  generateFakeData(1000);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
