import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto, TCreateOrderDto } from 'src/dto';
import { updateUserDto } from 'src/dto/users/update-user.dto';
import { OrdersEntity, UsersEntity } from 'src/entities';
import { ECategory, EDelivery, EPayment, EStatus } from 'src/enums';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(UsersEntity)
      private readonly userRepository: Repository<UsersEntity>,
      @InjectRepository(OrdersEntity)
      private readonly orderRepository: Repository<OrdersEntity>,
      private readonly jwtService: JwtService,
   ) {}

   async getUsers() {
      const users = await this.userRepository.find({
         relations: ['orders', 'orders.products'],
      });

      if (!users) {
         throw new NotFoundException('Users not found');
      }

      return users.map(user => {
         return {
            ...user,
            orders: user.orders.map(order => {
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
            }),
         };
      });
   }

   async getUserById(req: Request) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);

      const user = await this.userRepository.findOne({
         where: { id: payload.id },
         relations: ['orders', 'orders.products'],
      });

      if (!user) {
         throw new NotFoundException('User with this id not found');
      }

      return {
         ...user,
         orders: user.orders.map(order => {
            return {
               ...order,
               deliveryType: EDelivery[order.deliveryType],
               paymentType: EPayment[order.paymentType],
               status: EStatus[order.status],
               products: order.products.map(product => {
                  return {
                     ...product,
                     category: ECategory[product.category],
                  };
               }),
            };
         }),
      };
   }

   async createUser(userDto: createUserDto) {
      const { ordersIds, ...user } = userDto;

      let userFromDb = this.userRepository.create({
         ...user,
         id: userDto.id ?? crypto.randomUUID(),
      });

      if (ordersIds && ordersIds.length > 0) {
         const orders = await Promise.all(
            ordersIds.map(orderId => {
               return this.orderRepository.findOne({ where: { id: orderId } });
            }),
         );

         const savedOrders = await this.orderRepository.save(orders);

         userFromDb.orders = savedOrders;
      }
      return await this.userRepository.save(userFromDb);
   }

   async updateUser(req: Request, userDto: updateUserDto) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);

      const existingUser = await this.userRepository.findOne({
         where: { id: payload.id },
         relations: ['orders'],
      });

      if (!existingUser) {
         throw new NotFoundException('User with this id not found');
      }

      const orders = await Promise.all(
         userDto.orderIds.map(orderId => {
            return this.orderRepository.findOne({ where: { id: orderId.id } });
         }),
      );

      return await this.userRepository.save({
         ...userDto,
         orders,
      });
   }

   async deleteUser(req: Request) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);

      const existingUser = await this.userRepository.findOne({
         where: { id: payload.id },
      });

      if (!existingUser) {
         throw new NotFoundException('User with this id not found');
      }

      return await this.userRepository.delete(payload.id);
   }
}
