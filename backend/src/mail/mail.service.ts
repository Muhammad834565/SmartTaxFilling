import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface InquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  country?: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST', 'smtp.gmail.com'),
      port: parseInt(this.config.get<string>('SMTP_PORT', '587'), 10),
      secure: false,
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendInquiryNotification(data: InquiryEmailData) {
    const notifyEmail = this.config.get<string>('NOTIFY_EMAIL', 'info@smartaxglobal.com');
    const from = this.config.get<string>('SMTP_FROM', '"SMARTax Global" <info@smartaxglobal.com>');

    try {
      // Notify admin
      await this.transporter.sendMail({
        from,
        to: notifyEmail,
        subject: `🔔 New Consultation Request — ${data.name} (${data.country || 'Unknown'})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0c1a2e; padding: 24px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #2DC55F; margin: 0;">New Lead — SMARTax Global</h2>
              <p style="color: #94a3b8; margin: 4px 0 0;">Consultation request received</p>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 130px;"><strong>Name</strong></td><td style="padding: 8px 0; color: #0f172a;">${data.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2DC55F;">${data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Phone</strong></td><td style="padding: 8px 0; color: #0f172a;">${data.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Country</strong></td><td style="padding: 8px 0; color: #0f172a;">${data.country || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Service</strong></td><td style="padding: 8px 0; color: #0f172a;">${data.service || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 4px; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Message</strong></td><td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${data.message}</td></tr>
              </table>
              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <a href="http://localhost:3000/admin/inquiries" style="background: #2DC55F; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold;">View in Admin Panel →</a>
              </div>
            </div>
          </div>
        `,
      });

      // Auto-reply to client
      await this.transporter.sendMail({
        from,
        to: data.email,
        subject: 'We received your consultation request — SMARTax Global',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0c1a2e; padding: 24px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #2DC55F; margin: 0;">SMARTax Global</h2>
              <p style="color: #94a3b8; margin: 4px 0 0;">Trusted Finance & Tax Consultancy</p>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
              <p style="color: #0f172a;">Dear <strong>${data.name}</strong>,</p>
              <p style="color: #475569;">Thank you for reaching out to SMARTax Global. We have received your consultation request and one of our certified tax advisors will review your requirements and contact you within <strong>24 business hours</strong>.</p>
              <p style="color: #475569;">If you need immediate assistance, please call us at <strong>+1 (813) 555-0199</strong>.</p>
              <p style="color: #475569; margin-top: 24px;">Warm regards,<br/><strong style="color: #0c1a2e;">The SMARTax Global Team</strong></p>
            </div>
          </div>
        `,
      });

      this.logger.log(`Inquiry email sent for ${data.email}`);
    } catch (err) {
      this.logger.warn(`Email failed (non-fatal): ${err.message}`);
      // Email failure should not fail the form submission
    }
  }
}

