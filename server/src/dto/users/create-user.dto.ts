import { z as zod } from 'zod';

const userScheme = zod.object({
   id: zod.string().uuid().optional(),
   name: zod.string(),
   surname: zod.string(),
   email: zod.string().email().optional(),
   phone: zod.string(),
   allergens: zod.array(zod.string()),
   ordersIds: zod.array(zod.string().uuid()),
}).partial();

type createUserDto = zod.infer<typeof userScheme>;

export { userScheme, createUserDto }
