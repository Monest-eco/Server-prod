import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
