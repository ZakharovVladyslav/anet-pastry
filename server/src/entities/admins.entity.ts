import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class AdminsEntity {
   @PrimaryGeneratedColumn('uuid') id: UUID;

   @Column('smallint') role: number;

   @Column() email: string;

   @Column() password: string;

   @Column() name: string;

   @Column() surname: string;

   @Column({ nullable: true }) refreshToken: string;
}
