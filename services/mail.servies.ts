import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private transporter: Mail;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, 
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendMailActivationCode(toEmail: string, link: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_USER'),
      to: toEmail,
      subject: 'GreenWay',
      text: '',
      html: `
        <div>
          <h2>Faollashtirish uchun ushbu kodni kiriting</h2>
          <h1>${link}</h1>
          <h2>Ushbu kodni hech kimga bermang. Bu kod sizning shaxsiy kabinitezga kirish kodidir</h2>
        </div>
      `,
    });
  }

  async sendMailActivationLink(toEmail: string, link: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_USER'),
      to: toEmail,
      subject: 'GreenWay akkauntni faollashtirish',
      text: '',
      html: `
        <div>
          <h2>Akkauntni faollashtirish uchun quyidagi linkni bosing</h2>
          <a href="${link}">Faollashtirish</a>
        </div>
      `,
    });
  }
}