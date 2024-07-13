import {
   Body,
   Controller,
   Get,
   Param,
   Post,
   Delete,
   Patch,
   UseGuards,
   Req,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { TCreateOrderDto, TUpdateOrderDto } from '../../dto';
import { AuthGuard } from 'src/guards';
import { Request } from 'express';

@Controller('orders')
export class OrderController {
   constructor(private readonly orderService: OrderService) {}

   @UseGuards(AuthGuard)
   @Get()
   getOrders() {
      return this.orderService.getOrders();
   }

   @UseGuards(AuthGuard)
   @Get('order')
   getOrderById(@Req() req: Request) {
      return this.orderService.getOrderById(req);
   }

   @Post()
   createOrder(@Body() order: TCreateOrderDto, @Req() req: Request) {
      return this.orderService.createOrder(order, req);
   }

   @Patch(':id')
   updateOrder(@Req() req: Request, @Body() order?: TUpdateOrderDto) {
      return this.orderService.updateOrder(req, order);
   }

   @Delete(':id')
   deleteOrder(@Req() req: Request) {
      return this.orderService.deleteOrder(req);
   }
}
