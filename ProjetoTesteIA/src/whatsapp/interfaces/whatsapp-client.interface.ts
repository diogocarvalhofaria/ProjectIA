export interface iWhatsappClient {
  sendMessage(to: string, text: string): Promise<string>;
  getStatus(): Promise<any>;
}