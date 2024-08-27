import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class MessagingService {
    private readonly client: twilio.Twilio;

    constructor() {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendSms(to: string, body: string): Promise<any> {
        try {
            return await this.client.messages.create({
                body,
                from: process.env.TWILIO_PHONE_NUMBER,
                to,
            });
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error('Failed to send SMS');
        }
    }
}
