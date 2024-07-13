import { UUID } from 'crypto';
import { EDelivery, EPayment, EPaymentStatus, EStatus } from '@/enums';
import { TProductDTO } from './product';

export type TOrderInnerFilter = {
   label: string;
   value: string | number | boolean;
   extraprice?: number;
};

export type TOrderFilter = {
   id: string;
   filters: TOrderInnerFilter[];
};

type TOrder = {
   id: UUID;
   status: EStatus;
   totalprice: number;
   createdat: string;
   deliverytype: EDelivery;
   address: string;
   paymenttype: EPayment;
   contactphone: string;
   paymentstatus: EPaymentStatus;
   filters: TOrderFilter[];
   products: TProductDTO[];
   ordernumber: string;
   name: string;
};

export type { TOrder };
