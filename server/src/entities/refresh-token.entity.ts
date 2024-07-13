import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity()
export class RefreshTokenEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   token: string;

   @Column()
   expiryDate: Date;

   @ManyToOne(() => UsersEntity)
   user: UsersEntity;
}
