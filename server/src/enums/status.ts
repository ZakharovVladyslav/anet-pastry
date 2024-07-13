import { z } from 'zod';

enum EStatus {
   new = 1,
   confirmed = 2,
   in_progress = 3,
   ready = 4,
   delivered = 5
}

const EZodStatus = z.enum([
   'new',
   'confirmed',
   'in_progress',
   'ready',
   'delivered'
]);

export { EZodStatus, EStatus };
