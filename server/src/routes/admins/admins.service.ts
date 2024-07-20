import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Request } from 'express';
import { TCreateAdminDto, TUpdateAdminDto } from 'src/dto';
import { AdminsEntity } from 'src/entities';
import { ERole } from 'src/enums/roles';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
   constructor(
      @InjectRepository(AdminsEntity)
      private readonly adminsRepository: Repository<AdminsEntity>,
      private readonly jwtService: JwtService,
   ) {}

   async getAdmins() {
      const admins = await this.adminsRepository.find();

      if (!admins) {
         throw new NotFoundException('Admins not found');
      }

      return admins.map(admin => {
         return {
            ...admin,
            role: ERole[admin.role],
         };
      });
   }

   async getAdminById(req: Request) {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) throw new BadRequestException('Token is not provided');

      const { id } = this.jwtService.decode(token);

      const admin = await this.adminsRepository.findOne({ where: { id } });

      if (!admin) {
         throw new NotFoundException('Admin with this id is not found');
      }

      return {
         ...admin,
         role: ERole[admin.role],
      };
   }

   createAdmin(adminDto: TCreateAdminDto) {
      const admin = this.adminsRepository.create({
         ...adminDto,
         role: ERole[adminDto.role],
      });

      return this.adminsRepository.save(admin);
   }

   updateAdmin(id: UUID, updateAdminDto: TUpdateAdminDto) {
      if (!(updateAdminDto.role in ERole)) {
         throw new BadRequestException('Role is not valid');
      }

      const existingAdmin = this.adminsRepository.findOne({ where: { id } });

      if (!existingAdmin) {
         throw new NotFoundException('Admin with this id is not found');
      }

      return this.adminsRepository.update(id, {
         ...updateAdminDto,
         role: ERole[updateAdminDto.role],
      });
   }

   deleteAdmin(id: UUID) {
      return this.adminsRepository.delete({ id });
   }
}
