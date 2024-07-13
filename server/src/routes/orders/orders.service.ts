import { Injectable, NotFoundException } from '@nestjs/common';
import { TCreateOrderDto, TOrderProduct, TUpdateOrderDto } from '../../dto/orders';
import { Repository } from 'typeorm';
import { OrdersEntity, ProductsEntity, UsersEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ECategory, EDelivery, EPayment, EStatus } from 'src/enums';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EPaymentStatus } from 'src/enums/payment-status';

@Injectable()
export class OrderService {
   constructor(
      @InjectRepository(OrdersEntity)
      private readonly orderRepository: Repository<OrdersEntity>,
      @InjectRepository(ProductsEntity)
      private readonly productRepository: Repository<ProductsEntity>,
      @InjectRepository(UsersEntity)
      private readonly userRepository: Repository<UsersEntity>,
      private readonly jwtService: JwtService,
   ) {}

   async getOrders() {
      const orders = await this.orderRepository.find({ relations: ['products'] });

      if (!orders) {
         throw new NotFoundException('Orders not found');
      }

      return orders.map(order => {
         return {
            ...order,
            deliveryType: EDelivery[order.deliveryType],
            paymentType: EPayment[order.paymentType],
            status: EStatus[order.status],
            filters: JSON.parse(order.filters),
            paymentStatus: EPaymentStatus[order.paymentStatus],
            products: order.products.map(product => {
               return {
                  ...product,
                  category: ECategory[product.category],
               };
            }),
         };
      });
   }

   async getOrderById(req: Request) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);

      const order = await this.orderRepository.findOne({
         where: { id: payload.id },
         relations: ['products'],
      });

      if (!order) {
         throw new NotFoundException('Order with this id not found');
      }

      return {
         ...order,
         deliveryType: EDelivery[order.deliveryType],
         paymentType: EPayment[order.paymentType],
         status: EStatus[order.status],
         filters: JSON.parse(order.filters),
         products: order.products.map(product => {
            return {
               ...product,
               category: ECategory[product.category],
            };
         }),
      };
   }

   async createOrder(orderDto: TCreateOrderDto, req: Request) {
      let user = null;

      if (req.headers.authorization) {
         const token = req.headers.authorization.split(' ')[1];
         const payload = this.jwtService.decode(token);

         user = await this.userRepository.findOne({ where: { id: payload.id } });
      }

      const products: ProductsEntity[] = await Promise.all(
         orderDto.products.map(async productId => {
            const product = await this.productRepository.findOne({
               where: { id: productId },
            });

            if (!product) {
               throw new NotFoundException('Product with this id not found');
            }

            return product as ProductsEntity;
         }),
      );

      const order = this.orderRepository.create({
         ...orderDto,
         paymentStatus: EPaymentStatus[orderDto.paymentStatus],
         filters: JSON.stringify(orderDto.filters),
         id: orderDto.id,
         deliveryType: EDelivery[orderDto.deliveryType],
         paymentType: EPayment[orderDto.paymentType],
         status: EStatus[orderDto.status],
         products: products.map(product => {
            return {
               ...product,
               category: +ECategory[product.category],
            };
         }),
         user,
      });
      return await this.orderRepository.save(order);
   }

   async updateOrder(req: Request, updateOrderDto: TUpdateOrderDto) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);

      const existingOrder = await this.orderRepository.findOne({
         where: { id: payload.id },
      });

      if (!existingOrder) {
         throw new NotFoundException('Order with this id not found');
      }

      const updatedOrder = this.orderRepository.merge(existingOrder, {
         ...updateOrderDto,
         status: EStatus[updateOrderDto.status],
         paymentStatus: EPaymentStatus[updateOrderDto.paymentStatus],
      });

      return await this.orderRepository.save(updatedOrder);
   }

   async deleteOrder(req: Request) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);

      const order = await this.orderRepository.findOne({ where: { id: payload.id } });

      if (!order) {
         throw new NotFoundException('Order with this id not found');
      }

      return await this.orderRepository.delete({ id: payload.id });
   }
}
