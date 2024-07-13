import {
   ForbiddenException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { LoginDto } from 'src/dto';
import { AdminsEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthAdminService {
   constructor(
      @InjectRepository(AdminsEntity)
      private readonly adminsRepository: Repository<AdminsEntity>,
      private readonly jwtService: JwtService,
   ) {}

   async login(loginDto: LoginDto) {
      const admin = await this.adminsRepository.findOne({
         where: {
            email: loginDto.email,
         },
      });

      if (!admin) {
         throw new NotFoundException('Admin not found');
      }

      if (admin.password !== loginDto.password) {
         throw new ForbiddenException('Invalid password');
      }

      const accessTokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
      const refreshTokenExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;

      const accessToken = this.jwtService.sign({
         id: admin.id,
         exp: accessTokenExpiry,
      });

      const refreshToken = this.jwtService.sign({
         id: admin.id,
         exp: refreshTokenExpiry,
      });

      await this.adminsRepository.save({
         ...admin,
         refreshToken,
      });

      return { accessToken, refreshToken, accessTokenExpiry };
   }

   async refreshToken(req: Request) {
      const token = req.headers.authorization.split(' ')[1];

      const payload = this.jwtService.decode(token);

      const admin = await this.adminsRepository.findOne({
         where: { id: payload.id },
      });

      if (token !== admin.refreshToken) {
         throw new UnauthorizedException('Invalid refresh token');
      }

      console.log('refresh');

      const accessTokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
      const accessTokenPayload = { id: payload.id, exp: accessTokenExpiry };

      const newAccessToken = this.jwtService.sign(accessTokenPayload);

      return {
         accessToken: newAccessToken,
         refreshToken: payload.refreshToken,
         accessTokenExpiry,
      };
   }
}
