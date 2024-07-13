import { EZodCategory, EZodFilterType } from 'src/enums';
import { z as zod } from 'zod';

const parameterSchema = zod.lazy(() =>
   zod.object({
      id: zod.string().uuid(),
      label: zod.string(),
      fieldType: EZodFilterType,
      defaultValue: zod.string(),
      extraPrice: zod.number().optional(),
   }).partial(),
);

const parametersSchema = zod.array(parameterSchema);

const createProductSchema = zod.object({
   id: zod.string().uuid(),
   name: zod.string(),
   description: zod.string(),
   parameters: parametersSchema,
   category: EZodCategory,
   price: zod.number().min(0),
   discount: zod.number().min(0).max(100).nullable(),
   allergens: zod.array(zod.string()),
   isActive: zod.boolean(),
   imagesOrder: zod.string(),
   portionWeight: zod.number().min(0),
}).partial();

type TCreateProductDto = zod.infer<typeof createProductSchema>;

export { createProductSchema, TCreateProductDto };
