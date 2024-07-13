import { z } from 'zod';

enum EDelivery {
   pickup = 1,
   delivery = 2
}

const EZodDelivery = z.enum(['pickup', 'delivery']);

export { EZodDelivery, EDelivery };
