import { ZodError } from 'zod';

export function formatZodError(error: ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const key = issue.path[0];
    if (typeof key === 'string') {
      result[key] = issue.message;
    }
  });
  return result;
}
