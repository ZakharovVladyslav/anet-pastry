import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto';
import { RefreshTokenEntity, UsersEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      @InjectRepository(UsersEntity)
      private readonly usersRepository: Repository<UsersEntity>,
   ) {}

   async login(loginDto: LoginDto) {
      const user = await this.usersRepository.findOne({
         where: { email: loginDto.email },
      });

      if (!user) {
         throw new NotFoundException('User not found');
      }

      if (!user || user.password !== loginDto.password) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const accessTokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
      const refreshTokenExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;

      const accessTokenPayload = { id: user.id, exp: accessTokenExpiry };
      const refreshTokenPayload = { id: user.id, exp: refreshTokenExpiry };

      const accessToken = this.jwtService.sign(accessTokenPayload);
      const refreshToken = this.jwtService.sign(refreshTokenPayload);

      user.refreshToken = refreshToken;
      await this.usersRepository.save(user);

      return {
         accessToken,
         refreshToken,
         accessTokenExpiry,
      };
   }

   async refresh(req: Request) {
      const token = req.headers.authorization.split(' ')[1];

      const payload = this.jwtService.decode(token);

      console.log({ payload });

      const user = await this.usersRepository.findOne({
         where: { id: payload.id },
      });

      console.log({ user });

      if (!user) {
         throw new NotFoundException('User not found');
      }

      const accessTokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
      const accessTokenPayload = { id: user.id, exp: accessTokenExpiry };

      const newAccessToken = this.jwtService.sign(accessTokenPayload);

      return {
         accessToken: newAccessToken,
         refreshToken: user.refreshToken,
         accessTokenExpiry,
      };
   }

   async validateUser(payload: any) {
      return this.usersRepository.findOne({ where: { id: payload.sub } });
   }
}
