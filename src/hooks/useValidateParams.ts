import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';

export function useValidatedParams<TSchema extends z.ZodType>(
  schema: TSchema,
): z.output<TSchema> | null {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const result = schema.safeParse(params);

  if (!result.success) {
    return null;
  }

  return result.data;
}
