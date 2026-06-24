import { z } from 'zod';

const productResponseSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative().int(),
  categoryId: z.number().int(),
});

export default productResponseSchema;

export type ProductResponse = z.infer<typeof productResponseSchema>;

export const productPaginationResponseSchema = z.object({
  data: productResponseSchema.array(),
  meta: z.object({
    total: z.number().nonnegative().int(),
    page: z.number().nonnegative().int(),
    limit: z.number().min(5).int(),
    totalPages: z.number().int().nonnegative(),
  }),
});

export type ProductPaginationResponse = z.infer<
  typeof productPaginationResponseSchema
>;
