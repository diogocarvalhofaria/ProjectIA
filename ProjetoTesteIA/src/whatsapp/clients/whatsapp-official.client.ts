// src/whatsapp/clients/whatsapp-official.client.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { iWhatsappClient } from '../interfaces/whatsapp-client.interface';

@Injectable()
export class WhatsappOfficialClient implements iWhatsappClient {
  constructor(private readonly httpService: HttpService) {}

  async sendMessage(to: string, text: string): Promise<string> {
    const payload = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: text,
        preview_url: false,
      },
    };

    const response = await lastValueFrom(
      this.httpService.post(
        String(process.env.WHATSAPP_API_URL),
        payload,
        {
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          },
        },
      ),
    );

    return response.data.messages[0].id;
  }

  async getStatus(): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get(
        `${process.env.WHATSAPP_API_URL}/status`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          },
        },
      ),
    );
    return response.data;
  }
}