import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private wahaApiUrl: string;
  private sessionName: string;

  constructor(private configService: ConfigService) {
    const apiUrl = this.configService.get<string>('WAHA_API_URL');
    this.logger.log(`URL da API WAHA configurada: ${apiUrl}`);

    if (!apiUrl) {
      throw new Error('WAHA_API_URL não está definida no arquivo .env');
    }

    // Remover barra final se existir para evitar barras duplicadas
    this.wahaApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

    // Definir nome da sessão padrão (adicione esta variável ao seu .env)
    this.sessionName = this.configService.get<string>('WAHA_SESSION_NAME') || 'session1';
  }

  async testWahaIntegration(to: string, text: string) {
    try {
      // Adicionando o nome da sessão à URL
      const endpoint = `${this.wahaApiUrl}/api/${this.sessionName}/sendText`;
      this.logger.log(`Enviando mensagem para: ${endpoint}`);

      const response = await axios.post(endpoint, {
        chatId: to,
        text: text
      });

      return response.data;
    } catch (error) {
      this.logger.error(`Erro ao enviar mensagem: ${error.message}`);
      if (error.response) {
        this.logger.error(`Detalhes do erro: ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }
}