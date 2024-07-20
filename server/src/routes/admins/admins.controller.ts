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
   UsePipes,
} from '@nestjs/common';
import {
   createAdminDto,
   TCreateAdminDto,
   TUpdateAdminDto,
   updateAdminDto,
} from 'src/dto';
import { AdminsService } from './admins.service';
import { UUID } from 'crypto';
import { ZodValidationPipe } from 'src/pipes';
import { AdminAuthGuard } from 'src/guards';
import { Request } from 'express';

@Controller('admins')
export class AdminsController {
   constructor(private readonly adminsService: AdminsService) {}

   @Get()
   // @UseGuards(AdminAuthGuard)
   getAdmins() {
      return this.adminsService.getAdmins();
   }

   @Get('admin')
   // @UseGuards(AdminAuthGuard)
   getAdminById(@Req() req: Request) {
      return this.adminsService.getAdminById(req);
   }

   @Post()
   // @UseGuards(AdminAuthGuard)
   createAdmin(@Body() adminDto: TCreateAdminDto) {
      return this.adminsService.createAdmin(adminDto);
   }

   @Patch(':id')
   // @UseGuards(AdminAuthGuard)
   updateAdmin(@Param('id') id: UUID, @Body() updateAdminDto: TUpdateAdminDto) {
      return this.adminsService.updateAdmin(id, updateAdminDto);
   }

   @Delete(':id')
   // @UseGuards(AdminAuthGuard)
   deleteAdmin(@Param('id') id: UUID) {
      return this.adminsService.deleteAdmin(id);
   }
}
