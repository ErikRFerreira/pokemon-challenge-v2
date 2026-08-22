import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';

export function useValidatedParams<TSchema extends z.ZodType>(
  schema: TSchema,
): z.output<TSchema> {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const result = schema.safeParse(params);

  if (!result.success) {
    throw new Response('Invalid Route Parameters', { status: 400 });
  }

  return result.data;
}
