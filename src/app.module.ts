import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HardwareModule } from './hardware/hardware.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Esp32Entity } from './esp32/esp32';
import config from './configs/deafult.config';
import { config as dotenvConfig } from 'dotenv';
import { AppGateway } from './app.gateway';

dotenvConfig();

@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.STATUS === 'prod' ? config.database.url : 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Esp32Entity],
    }),
    HardwareModule,
  ],
})
export class AppModule {}
