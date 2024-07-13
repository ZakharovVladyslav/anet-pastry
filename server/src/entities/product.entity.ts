import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
   OneToMany,
   ManyToMany,
} from 'typeorm';
import { OrdersEntity } from './order.entity';

// TODO if product wasn't used in any order then it can be deleted completely otherwise it should be marked as inactive
// TODO mark on client that "THIS PRODUCT ALREADY IN USED IN SOME ORDERS"

@Entity('products')
export class ProductsEntity {
   @PrimaryGeneratedColumn('uuid') id: string;

   @Column({ nullable: true }) name: string;

   @Column({ nullable: true }) description: string;

   @Column({ nullable: true }) dateCreated: string;

   @Column('smallint', { nullable: true }) category: number;

   @Column({ nullable: true }) isActive: boolean;

   @Column({ nullable: true }) price: number;

   @Column({ nullable: true }) discount: number | null;

   @Column({ nullable: true }) portionWeight: number;

   @Column({ nullable: true }) allergens: string;

   @Column({ nullable: true }) parameters: string;

   @Column({ nullable: true }) imagesOrder: string;

   @ManyToMany(() => OrdersEntity, order => order.products)
   orders: OrdersEntity[];
   orderProducts: any;
}

@Entity('filters')
export class FiltersEntity {
   @PrimaryGeneratedColumn('uuid') id: string;

   @Column() label: string;

   @Column('smallint') fieldType: number;

   @Column() defaultValue: string;

   @Column() extraPrice: number;

   @ManyToOne(() => ProductsEntity)
   @JoinColumn({ name: 'productid' })
   products: ProductsEntity;
}
