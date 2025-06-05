import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WhatsappTypesInput, WhatsappTypesOutput } from './dto/whatsappTypes';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class WhatsappClient {
  constructor
  (private readonly htppService: HttpService) {
  }

  async sendMessage(to: string, text: string): Promise<any> {
    const payload: WhatsappTypesInput = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: text,
        preview_url: false,
      },
    };
    const response = await lastValueFrom(
      this.htppService.post<WhatsappTypesOutput>(
        String(process.env.WHATSAPP_API_URL),
        payload,
        {
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          },
        },
      ),
    );
    const [message] = response.data.messages;
    return message.id;
  }

  // Add methods to interact with the WhatsApp API here
  // For example, sendMessage, getMessages, etc.
}