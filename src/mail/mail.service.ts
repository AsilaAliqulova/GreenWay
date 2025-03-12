import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user:User) {
    const url = `${process.env.API_URL}/api/user/activate/${user.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: "GreenWay ga xush kelibsiz",
      template: "./confirm.hbs",
      context: {
        name: user.fullname,
        url:url,
      },
    });
  }


  
}
