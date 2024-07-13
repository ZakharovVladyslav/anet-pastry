import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { AuthAdminService } from './auth-admin.service';
import { Request } from 'express';

@Controller('/admins/auth')
export class AuthAdminController {
   constructor(private readonly authAdminService: AuthAdminService) {}

   @Post('/login')
   async login(@Body() loginDto: LoginDto) {
      return await this.authAdminService.login(loginDto);
   }

   @Post('/refresh')
   async refreshToken(@Req() req: Request) {
      return await this.authAdminService.refreshToken(req);
   }
}
