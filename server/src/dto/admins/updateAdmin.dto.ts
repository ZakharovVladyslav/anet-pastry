import { EZodRole } from 'src/enums/roles';
import { z as zod } from 'zod';

const updateAdminDto = zod.object({
   email: zod.string().email().optional(),
   password: zod.string().optional(),
   name: zod.string().optional(),
   surname: zod.string().optional(),
   role: EZodRole.optional()
}).partial();

type TUpdateAdminDto = zod.infer<typeof updateAdminDto>;

export { updateAdminDto, TUpdateAdminDto }
