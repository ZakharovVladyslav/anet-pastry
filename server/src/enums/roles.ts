import { z as zod } from "zod";

enum ERole {
   admin = 1,
   moderator = 2,
   accountant = 3,
   analyst = 4
}

const EZodRole = zod.enum(['admin', 'moderator', 'accountant', 'analyst']);

export { EZodRole, ERole }
