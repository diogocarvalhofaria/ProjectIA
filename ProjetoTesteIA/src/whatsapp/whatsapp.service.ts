import { Inject, Injectable } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { iWhatsappClient } from './interfaces/whatsapp-client.interface';

@Injectable()
export class WhatsappService {
  constructor(
    @Inject('WHATSAPP_CLIENT') private readonly whatsappClient: iWhatsappClient
  ) {
  }


  async testWahaIntegration(to: string, text: string) {
    return await this.whatsappClient.sendMessage(to, text);
  }

  create(createWhatsappDto: CreateWhatsappDto) {
    return 'This action adds a new whatsapp';
  }

  findAll() {
    return `This action returns all whatsapp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatsapp`;
  }

  update(id: number, updateWhatsappDto: UpdateWhatsappDto) {
    return `This action updates a #${id} whatsapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatsapp`;
  }
}
