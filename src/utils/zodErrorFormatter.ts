import { ZodError } from 'zod';

/**
 * Formats a ZodError object into a Record<string, string> object.
 * Each property in the object corresponds to a field in the schema
 * that had a validation error, and its value is the error message.
 * Fields that did not have a validation error are omitted from the object.
 * @param {ZodError} error - the ZodError object to format
 * @returns {Record<string, string>} - the formatted error object
 */
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
