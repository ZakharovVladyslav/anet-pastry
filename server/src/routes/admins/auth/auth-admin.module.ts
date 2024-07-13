import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([AdminsEntity]),
      JwtModule.register({
         secret: process.env.JWT_SECRET
      })
   ],
   providers: [AuthAdminService],
   controllers: [AuthAdminController],
})
export class AuthAdminModule {}
