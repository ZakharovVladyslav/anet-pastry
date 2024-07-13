// import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
// import { RedisService } from './redis.service';

// @Controller('auth')
// export class RedisController {
//    constructor(private readonly redisService: RedisService) {}

//    @Post('send-code')
//    async sendCode(@Body('phone') phone: string) {
//       // Generate the verification code
//       // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
//       const verificationCode = '3712';

//       // Store the verification code in Redis with the phone as the key
//       // Set the code to expire after 5 minutes
//       await this.redisService.set(phone, verificationCode, 'EX', 5 * 60);

//       // Send the verification code to the user's phone
//       // ...

//       return { message: 'Verification code sent' };
//    }

//    @Post('verify-code')
//    async verifyCode(@Body() body: { phone: string; code: string }) {
//       // Get the verification code from Redis
//       const storedCode = await this.redisService.get(body.phone);

//       // Check if the code matches the stored code
//       if (storedCode === body.code) {
//          // Verification successful, delete the code from Redis
//          await this.redisService.del(body.phone);

//          return { message: 'Verification successful' };
//       } else {
//          // Invalid verification code
//          // throw new BadRequestException('Invalid verification code');
//          return { message: 'Invalid verification code' };
//       }
//    }
// }
