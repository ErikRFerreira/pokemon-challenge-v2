import { z } from 'zod';

/**
 * PaginationParamSchema is a Zod schema that validates and transforms pagination parameters.
 * It ensures that the 'page' parameter is a positive integer, defaulting to 1 if not provided.
 * The schema uses z.coerce to convert the input to a number, applies Math.floor to round down,
 * and then pipes it through additional validation to ensure it is an integer and positive.
 */
export const PaginationParamSchema = z.object({
  page: z.coerce
    .number()
    .transform(Math.floor)
    .pipe(z.number().int().positive())
    .default(1),
});

export type PaginationParams = z.infer<typeof PaginationParamSchema>;
