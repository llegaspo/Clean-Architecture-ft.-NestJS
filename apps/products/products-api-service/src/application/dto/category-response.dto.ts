import { z } from 'zod';

const categoryResponseSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(1),
});

export default categoryResponseSchema;

export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
