import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative().int(),
  categoryId: z.number(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
