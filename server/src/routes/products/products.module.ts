import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ProductsEntity } from 'src/entities';

@Module({
   imports: [TypeOrmModule.forFeature([ProductsEntity])],
   controllers: [ProductsController],
   providers: [ProductsService],
})
export class ProductsModule {}
