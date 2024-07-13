import { z as zod } from 'zod';
import { createOrderSchema } from '../orders';

export const updateUserDto = zod.object({
   id: zod.string().uuid().optional(),
   name: zod.string().optional(),
   surname: zod.string().optional(),
   email: zod.string().email().optional(),
   phone: zod.string().optional(),
   allergens: zod.array(zod.string()).optional(),
   orderIds: zod.array(createOrderSchema).optional()
}).optional();

export type updateUserDto = zod.infer<typeof updateUserDto>;


