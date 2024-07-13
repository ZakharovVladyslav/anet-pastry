import { EZodStatus } from 'src/enums';
import { EZodPaymentStatus } from 'src/enums/payment-status';
import { string, z as zod } from 'zod';

const updateOrderSchema = zod
   .object({
      status: EZodStatus.optional(),
      paymentStatus: EZodPaymentStatus.optional(),
   })
   .partial();

type TUpdateOrderDto = zod.infer<typeof updateOrderSchema>;

export { updateOrderSchema, TUpdateOrderDto };
