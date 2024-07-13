import { EZodDelivery, EZodPayment, EZodStatus } from 'src/enums';
import { EZodPaymentStatus } from 'src/enums/payment-status';
import { string, z as zod } from 'zod';

const orderProductFilterSchema = zod.object({
   label: string(),
   value: zod.union([string(), zod.boolean(), zod.number()]),
   extraPrice: zod.number().optional()
});

const orderProductSchema = zod.object({
   id: string().uuid(),
   filters: zod.array(orderProductFilterSchema)
})

const createOrderSchema = zod.object({
   id: string().uuid().optional(),
   productName: string(),
   status: EZodStatus,
   totalPrice: zod.number(),
   createdAt: zod.string(),
   deliveryType: EZodDelivery,
   address: string().optional(),
   paymentType: EZodPayment,
   contactPhone: string(),
   paymentStatus: EZodPaymentStatus,
   products: zod.array(zod.string().uuid()).optional(),
   filters: zod.array(orderProductSchema),
   orderNumber: zod.string(),
   name: zod.string()
}).partial();

type TCreateOrderDto = zod.infer<typeof createOrderSchema>;
type TOrderProduct = zod.infer<typeof orderProductSchema>;

export { createOrderSchema, TCreateOrderDto, TOrderProduct };
