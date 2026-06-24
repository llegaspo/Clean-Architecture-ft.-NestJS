import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.number(),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
