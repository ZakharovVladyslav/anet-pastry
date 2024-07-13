import { z } from "zod";

const loginScheme = z.object({
   email: z.string().email(),
   password: z.string().min(6),
})

export type LoginDto = z.infer<typeof loginScheme>;
