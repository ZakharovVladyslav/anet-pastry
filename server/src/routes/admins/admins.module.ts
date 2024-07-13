import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/entities';
import { AuthAdminModule } from './auth/auth-admin.module';
import { JwtService } from '@nestjs/jwt';

@Module({
   imports: [AuthAdminModule, TypeOrmModule.forFeature([AdminsEntity])],
   controllers: [AdminsController],
   providers: [AdminsService, JwtService],
})
export class AdminsModule {}
