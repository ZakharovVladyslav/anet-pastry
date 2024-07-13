import { z } from 'zod';

enum EPayment {
   cash = 1,
   card = 2,
}

const EZodPayment = z.enum(['cash', 'card']);

export { EZodPayment, EPayment };
