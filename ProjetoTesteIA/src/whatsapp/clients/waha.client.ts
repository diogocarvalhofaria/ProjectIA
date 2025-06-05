// src/whatsapp/clients/waha.client.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { iWhatsappClient } from '../interfaces/whatsapp-client.interface';

@Injectable()
export class WahaClient implements iWhatsappClient {
  private readonly wahaUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.wahaUrl = process.env.WAHA_API_URL || 'http://localhost:3000/api/v1';
  }

  async sendMessage(to: string, text: string): Promise<string> {
    const formattedNumber = this.formatPhoneNumber(to);
    const payload = {
      chatId: formattedNumber,
      text: text
    };

    const response = await lastValueFrom(
      this.httpService.post(
        `${this.wahaUrl}/sendText`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data.id || '';
  }

  async getStatus(): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.wahaUrl}/status`)
    );
    return response.data;
  }

  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    return `${cleaned}@c.us`;
  }
}