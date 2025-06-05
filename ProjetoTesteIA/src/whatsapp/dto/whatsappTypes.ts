export type WhatsappTypesInput = {
  messaging_product: 'whatsapp';
  to: string;
  type: 'text' | 'image' | 'video' | 'document' | 'interactive' | 'template';
  text?: {
    body: string;
    preview_url?: false;
  };
};
export type WhatsappTypesOutput = {
 messages: {
   id: string;
 }[];
};