import { UUID } from 'crypto';
import { EDelivery, EPayment, EStatus } from '@/enums';
import { TProductDTO } from './product';

type TOrderInnerFilter = {
   label: string;
   value: string | number | boolean;
};

type TOrderFilter = {
   id: string;
   filters: TOrderInnerFilter[];
};

type TOrder = {
   id: UUID;
   image: string | null;
   status: EStatus;
   totalprice: number;
   createdat: string;
   deliverytype: EDelivery;
   address: string;
   paymenttype: EPayment;
   contactphone: string;
   ispaid: boolean;
   filters: TOrderFilter[];
   products: TProductDTO[];
};

export type { TOrder };
