import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { OrdersEntity, ProductsEntity, UsersEntity } from 'src/entities';

@Module({
   imports: [TypeOrmModule.forFeature([OrdersEntity, ProductsEntity, UsersEntity])],
   controllers: [OrderController],
   providers: [OrderService, JwtService],
})
export class OrderModule {}
