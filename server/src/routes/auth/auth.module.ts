import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersEntity, RefreshTokenEntity } from 'src/entities';

@Module({
   imports: [
      TypeOrmModule.forFeature([UsersEntity, RefreshTokenEntity]),
      JwtModule.register({
         secret: process.env.JWT_SECRET,
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService],
})
export class AuthModule {}
