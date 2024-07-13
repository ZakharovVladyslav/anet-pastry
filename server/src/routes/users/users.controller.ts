import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @UseGuards(AuthGuard)
   @Get()
   getUsers() {
      return this.usersService.getUsers();
   }

   @UseGuards(AuthGuard)
   @Get('user')
   getUserById(@Req() req: Request) {
      return this.usersService.getUserById(req);
   }

   @Post()
   createUser(@Body() createUserDto) {
      return this.usersService.createUser(createUserDto);
   }

   @UseGuards(AuthGuard)
   @Patch()
   updateUser(@Body() updateUserDto, @Req() req: Request) {
      return this.usersService.updateUser(req, updateUserDto);
   }

   @UseGuards(AuthGuard)
   @Delete()
   deleteUser() {
      // TODO add delete user functionality
   }
}
