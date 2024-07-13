import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   JoinTable,
   ManyToMany,
   ManyToOne,
   OneToMany,
} from 'typeorm';
import { ProductsEntity } from './product.entity';
import { UsersEntity } from './user.entity';

@Entity('orders')
export class OrdersEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('smallint')
   status: number;

   @Column('double precision')
   totalPrice: number;

   @Column()
   createdAt: string;

   @Column('smallint')
   deliveryType: number;

   @Column()
   address: string;

   @Column('smallint')
   paymentType: number;

   @Column()
   contactPhone: string;

   @Column('smallint')
   paymentStatus: number;

   @Column()
   filters: string;

   @Column()
   orderNumber: string;

   @Column()
   name: string;

   @ManyToMany(() => ProductsEntity, product => product.orders)
   @JoinTable()
   products: ProductsEntity[];

   @ManyToOne(() => UsersEntity, user => user.orders)
   user: UsersEntity;
}
