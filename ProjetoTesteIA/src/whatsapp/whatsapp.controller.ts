import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}


  @Post('teste-waha')
  async testeWaha(@Body() body: { to: string; text: string }) {
    return await this.whatsappService.testWahaIntegration(body.to, body.text);
  }

}
