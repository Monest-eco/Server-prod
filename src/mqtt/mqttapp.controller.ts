import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MqttAppController {
  @MessagePattern('esp32/watt')
  getNotificationWatt(@Payload() data: number, @Ctx() context: any) {
    console.log(data);
    console.log(context);
  }
}
