import { EZodRole } from 'src/enums/roles';
import { z as zod } from 'zod';

const createAdminDto = zod.object({
   email: zod.string().email(),
   password: zod.string(),
   name: zod.string(),
   surname: zod.string(),
   role: EZodRole
});

type TCreateAdminDto = zod.infer<typeof createAdminDto>;

export { createAdminDto, TCreateAdminDto }
