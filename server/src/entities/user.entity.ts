import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersEntity } from './order.entity';

@Entity('users')
export class UsersEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;

   @Column()
   surname: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column()
   phone: string;

   @Column('simple-array')
   allergens: string[];

   @Column({ nullable: true })
   refreshToken: string;

   @OneToMany(() => OrdersEntity, order => order.user)
   orders: OrdersEntity[];
}
