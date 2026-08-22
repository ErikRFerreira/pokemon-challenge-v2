import { z } from 'zod';

export const PaginationParamSchema = z.object({
  // Query-string values are strings at runtime, so parse before validating.
  page: z.coerce.number().int().positive().default(1),
});

export type PaginationParams = z.infer<typeof PaginationParamSchema>;
