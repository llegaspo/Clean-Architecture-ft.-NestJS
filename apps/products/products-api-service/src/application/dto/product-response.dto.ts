import { z } from 'zod';

const productResponseSchema = z.object({
  productId: z.string(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative(),
  categoryId: z.number().int().nullable(),
});

export default productResponseSchema;

export type ProductResponse = z.infer<typeof productResponseSchema>;
