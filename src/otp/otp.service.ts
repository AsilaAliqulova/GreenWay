import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OtpService {
  // constructor(private prisma: PrismaService) {}

  // async generateOtp(userId: number) {
  //   const code = Math.floor(100000 + Math.random() * 900000).toString();
  //   const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  //   return this.prisma.otp.create({
  //     data: {
  //       otp,
  //       expiration_time,
  //       phone
  //     },
  //   });
  // }

  // async verifyOtp(userId: number, code: string) {
  //   const otp = await this.prisma.otp.findUnique({
  //     where: { phone },
  //   });
  //   if (!otp || otp.otp !== code || otp.expiration_time < new Date()) {
  //     return false;
  //   }
  //   await this.prisma.otp.delete({ where: { id: otp.id } });
  //   return true;
  // }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
