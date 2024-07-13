import { Controller, Post, Body, Req } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService
   ) {}

   @Post('login')
   async login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
   }

   @Post('refresh')
   async refresh(@Req() req: Request) {
      return this.authService.refresh(req);
   }
}
