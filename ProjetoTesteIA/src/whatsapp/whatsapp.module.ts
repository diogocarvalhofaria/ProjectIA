import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WhatsappService } from './whatsapp.service';
import { WahaClient } from './clients/waha.client';
import { WhatsappOfficialClient } from './clients/whatsapp-official.client';
import { WhatsappController } from './whatsapp.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  controllers: [WhatsappController],
  providers: [
    WhatsappService,
    {
      provide: 'WHATSAPP_CLIENT',
      useFactory: (httpService: HttpService, configService: ConfigService) => {
        const clientType = configService.get('WHATSAPP_CLIENT_TYPE');
        return clientType === 'waha'
          ? new WahaClient(httpService)
          : new WhatsappOfficialClient(httpService);
      },
      inject: [HttpService, ConfigService],
    }
  ],
  exports: [WhatsappService]
})
export class WhatsappModule {}