import { z } from 'zod';

const categoryResponseSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
});

export default categoryResponseSchema;

export type CategoryResponse = z.infer<typeof categoryResponseSchema>;
