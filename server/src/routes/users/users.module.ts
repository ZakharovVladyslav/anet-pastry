import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity, UsersEntity } from 'src/entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
   imports: [TypeOrmModule.forFeature([UsersEntity, OrdersEntity])],
   controllers: [UsersController],
   providers: [UsersService, JwtService],
})
export class UsersModule {}
