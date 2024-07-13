import { UUID } from 'crypto';
import { TOrder } from './order';

type TUserDto = {
   id: UUID;
   name: string;
   surname: string;
   password?: string;
   email: Nullable<string>;
   phone: string;
   allergens: TAllergen[];
   orders: TOrder[] | UUID[];
};

type TUserPayload = {
   name?: string;
   phone?: string;
};

type TUserUpdatePayload = {
   name?: string;
   email?: Nullable<string>;
   phone?: string;
   allergens?: TAllergen[];
   orders?: UUID[];
}
