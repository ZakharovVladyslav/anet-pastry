import { z as zod } from 'zod';

export enum EPaymentStatus {
   not_paid = 1,
   paid = 2,
   refunded = 3,
   paid_partially = 4,
}

export const EZodPaymentStatus = zod.enum([
   'not_paid',
   'paid',
   'refunded',
   'paid_partially',
]);
