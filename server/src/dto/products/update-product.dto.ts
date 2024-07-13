import { EZodCategory, EZodFilterType } from 'src/enums';
import { z as zod } from 'zod';

const parameterSchema = zod.lazy(() =>
   zod.object({
      id: zod.string().uuid().optional(),
      label: zod.string().optional(),
      fieldType: EZodFilterType.optional(),
      defaultValue: zod.string().optional(),
      extraPrice: zod.number().optional(),
   }),
);

const parametersSchema = zod.array(parameterSchema);

const updateProductSchema = zod
   .object({
      id: zod.string().uuid().optional(),
      name: zod.string().optional(),
      description: zod.string().optional(),
      parameters: parametersSchema.optional(),
      dateCreated: zod.string().optional(),
      category: EZodCategory.optional(),
      price: zod.number().min(0).optional(),
      discount: zod.number().min(0).max(100).nullable().optional(),
      allergens: zod.array(zod.string()).optional(),
      isActive: zod.boolean().optional(),
      imagesOrder: zod.string().optional(),
      portionWeight: zod.number().min(0).optional(),
   })
   .partial();

type TUpdateProductDto = zod.infer<typeof updateProductSchema>;

export { updateProductSchema, TUpdateProductDto };
