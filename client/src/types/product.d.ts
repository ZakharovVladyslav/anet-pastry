import { UUID } from 'crypto';
import { ECategory, EDelivery, EFilterType, EPayment, EStatus } from '@/enums';

type TFullProductDTO = TProductDTO & { filters: TProductDTOFilter[] };

type TProductDTO = {
   id: UUID;
   name: string;
   description: string;
   datecreated: string;
   image: Nullable<string>;
   category: string;
};

type TProductDTOFilter = {
   id: UUID;
   label: string;
   fieldtype: EFilterType;
   defaultvalue: string;
};

type TProductPayload = {
   image: Nullable<string>;
   status: EStatus;
   totalprice: number;
   createdat: string;
   deliverytype: EDelivery;
   address: string;
   paymenttype: EPayment;
   contactphone: string;
   ispaid: boolean;
   filters: TProductDTOFilter[];
   products: UUID[];
};

type TProductUpdatePayload = {
   id: UUID;
   category?: ECategory,
   filters?: TProductDTOFilter[];
};

export type { TFullProductDTO, TProductDTO, TProductPayload, TProductUpdatePayload };
