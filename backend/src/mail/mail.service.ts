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
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly config: ConfigService) {
    const brevoApiKey = this.config.get<string>('BREVO_API_KEY');
    if (brevoApiKey && brevoApiKey.trim().length > 0 && !brevoApiKey.includes('your-brevo-api-key')) {
      this.logger.log('Brevo HTTP API configured for transactional emails');
    } else {
      // Fallback to SMTP (e.g. for local dev or custom SMTP)
      this.transporter = nodemailer.createTransport({
        host: this.config.get<string>('SMTP_HOST', 'smtp-relay.brevo.com'),
        port: parseInt(this.config.get<string>('SMTP_PORT', '587'), 10),
        secure: false,
        auth: {
          user: this.config.get<string>('SMTP_USER'),
          pass: this.config.get<string>('SMTP_PASS'),
        },
      });
      this.logger.log('SMTP transporter configured');
    }
  }

  private parseSender(fromStr: string): { name: string; email: string } {
    // Format: "SMARTax Global" <info@smartaxglobal.com> or info@smartaxglobal.com
    const match = fromStr.match(/"?([^"<]+)"?\s*<([^>]+)>/);
    if (match) {
      return { name: match[1].trim(), email: match[2].trim() };
    }
    return { name: 'SMARTax Global', email: fromStr.trim() };
  }

  private async sendViaBrevoHttp(params: {
    to: string;
    toName?: string;
    subject: string;
    htmlContent: string;
  }) {
    const apiKey = this.config.get<string>('BREVO_API_KEY')!.trim();
    const fromRaw = this.config.get<string>('SMTP_FROM', 'SMARTax Global <info@smartaxglobal.com>');
    const sender = this.parseSender(fromRaw);

    const payload = {
      sender: {
        name: sender.name,
        email: sender.email,
      },
      to: [
        {
          email: params.to,
          name: params.toName || params.to,
        },
      ],
      subject: params.subject,
      htmlContent: params.htmlContent,
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Brevo API error (${response.status}): ${errBody}`);
    }

    return await response.json();
  }

  async sendInquiryNotification(data: InquiryEmailData) {
    const notifyEmail = this.config.get<string>('NOTIFY_EMAIL', 'info@smartaxglobal.com');
    const brevoApiKey = this.config.get<string>('BREVO_API_KEY');
    const useBrevo = Boolean(brevoApiKey && brevoApiKey.trim().length > 0 && !brevoApiKey.includes('your-brevo-api-key'));

    const adminHtml = `
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
            <a href="https://frontend-xi-six-7ro19fc0f4.vercel.app/admin/inquiries" style="background: #2DC55F; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold;">View in Admin Panel →</a>
          </div>
        </div>
      </div>
    `;

    const clientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - SMARTax Global</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                
                <!-- ─── Premium Header with Logo ─── -->
                <tr>
                  <td style="background-color: #071224; padding: 36px 32px; text-align: center;">
                    <!-- Logo / Brand Container -->
                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <div style="background-color: #ffffff; width: 44px; height: 44px; border-radius: 10px; padding: 4px; display: inline-block;">
                            <img src="https://frontend-xi-six-7ro19fc0f4.vercel.app/logo-icon.png" alt="SMARTax Global Icon" width="44" height="44" style="display: block; width: 100%; height: auto; border: 0;" />
                          </div>
                        </td>
                        <td style="vertical-align: middle; text-align: left;">
                          <div style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; line-height: 1.1;">
                            SMARTax <span style="color: #2DC55F;">Global</span>
                          </div>
                          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 1.2px; text-transform: uppercase; margin-top: 2px;">
                            US &bull; UK &bull; Pakistan Tax & Corporate Advisory
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ─── Confirmation Hero Strip ─── -->
                <tr>
                  <td style="background: linear-gradient(90deg, #16a34a, #2DC55F); padding: 14px 24px; text-align: center; color: #ffffff; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase;">
                    &#10003; Order Confirmed &bull; Thank You for Choosing SMARTax Global
                  </td>
                </tr>

                <!-- ─── Body Content ─── -->
                <tr>
                  <td style="padding: 36px 32px 24px 32px;">
                    <h1 style="color: #0f172a; font-size: 22px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.3;">
                      Dear ${data.name},
                    </h1>
                    <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                      Thank you for choosing <strong>SMARTax Global</strong>! Your service order and consultation request has been <strong>successfully confirmed and received</strong> by our corporate accounting team.
                    </p>
                    <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                      Our dedicated team of certified CPAs, tax professionals, and corporate advisors is already reviewing your case details. <strong>We will reach out to you shortly</strong> (within <strong>12 to 24 business hours</strong>) to initiate the onboarding process.
                    </p>

                    <!-- Summary Card -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 20px;">
                          <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #2DC55F; letter-spacing: 1px; margin-bottom: 12px;">
                            Order & Service Details
                          </div>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 140px; font-weight: 600;">Requested Service:</td>
                              <td style="padding: 6px 0; color: #0f172a; font-size: 13px; font-weight: 700;">${data.service || 'Comprehensive Tax / Corporate Services'}</td>
                            </tr>
                            ${data.country ? `
                            <tr>
                              <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Country / Jurisdiction:</td>
                              <td style="padding: 6px 0; color: #0f172a; font-size: 13px; font-weight: 700;">${data.country}</td>
                            </tr>
                            ` : ''}
                            ${data.phone ? `
                            <tr>
                              <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Contact Phone:</td>
                              <td style="padding: 6px 0; color: #0f172a; font-size: 13px; font-weight: 700;">${data.phone}</td>
                            </tr>
                            ` : ''}
                            <tr>
                              <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Order Status:</td>
                              <td style="padding: 6px 0;">
                                <span style="background-color: #dcfce7; color: #15803d; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; display: inline-block;">
                                  Confirmed &amp; Under Review
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- What Happens Next -->
                    <div style="background-color: #ecfdf5; border-left: 4px solid #2DC55F; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
                      <div style="font-weight: 800; color: #065f46; font-size: 14px; margin-bottom: 6px;">
                        What happens next?
                      </div>
                      <ol style="margin: 0; padding-left: 20px; color: #047857; font-size: 13px; line-height: 1.6;">
                        <li>Our senior advisor conducts a initial review of your filing/incorporation timeline.</li>
                        <li>You will receive a direct message / WhatsApp or email with the tailored onboarding checklist.</li>
                        <li>We schedule a free 1-on-1 discovery call to finalize filings or setup.</li>
                      </ol>
                    </div>

                    <!-- Direct Contact Banner -->
                    <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 8px 0;">
                      Need immediate assistance or want to send additional documents right away?
                    </p>
                    <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                      <tr>
                        <td style="padding-right: 12px;">
                          <a href="https://wa.me/19362206795" target="_blank" style="background-color: #2DC55F; color: #071224; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 800; display: inline-block;">
                            Chat on WhatsApp &rarr;
                          </a>
                        </td>
                        <td>
                          <a href="mailto:info@smartaxglobal.com" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; display: inline-block;">
                            Email Advisor
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 0; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                      Warm regards,<br/>
                      <strong style="color: #0c1a2e; font-size: 14px;">The SMARTax Global Team</strong><br/>
                      <span style="font-size: 12px; color: #94a3b8;">401 Timbered dr. Lufkin Texas 75901 | Phone: +1 936 220 6795</span>
                    </p>
                  </td>
                </tr>

                <!-- ─── Footer ─── -->
                <tr>
                  <td style="background-color: #071224; padding: 24px 32px; text-align: center; border-top: 1px solid #1e293b;">
                    <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">
                      &copy; ${new Date().getFullYear()} SMARTax Global. All Rights Reserved.
                    </p>
                    <p style="color: #475569; font-size: 11px; margin: 0;">
                      US LLC/Corp &bull; IRS Form 5472/1120 &bull; UK Ltd &amp; VAT &bull; Pakistan FBR/SECP &bull; QuickBooks &amp; Xero Bookkeeping
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      if (useBrevo) {
        // 1. Notify Admin via Brevo HTTP API
        await this.sendViaBrevoHttp({
          to: notifyEmail,
          toName: 'SMARTax Global Admin',
          subject: `🔔 New Consultation Request — ${data.name} (${data.country || 'Unknown'})`,
          htmlContent: adminHtml,
        });

        // 2. Auto-reply to Client via Brevo HTTP API
        await this.sendViaBrevoHttp({
          to: data.email,
          toName: data.name,
          subject: 'Order Confirmed: Thank You for Choosing SMARTax Global',
          htmlContent: clientHtml,
        });

        this.logger.log(`Inquiry emails delivered via Brevo HTTP API for ${data.email}`);
      } else if (this.transporter) {
        const from = this.config.get<string>('SMTP_FROM', '"SMARTax Global" <info@smartaxglobal.com>');

        // Notify admin via SMTP
        await this.transporter.sendMail({
          from,
          to: notifyEmail,
          subject: `🔔 New Consultation Request — ${data.name} (${data.country || 'Unknown'})`,
          html: adminHtml,
        });

        // Auto-reply to client via SMTP
        await this.transporter.sendMail({
          from,
          to: data.email,
          subject: 'Order Confirmed: Thank You for Choosing SMARTax Global',
          html: clientHtml,
        });

        this.logger.log(`Inquiry emails delivered via SMTP for ${data.email}`);
      }
    } catch (err: any) {
      this.logger.warn(`Email delivery failed (non-fatal): ${err.message}`);
    }
  }
}

