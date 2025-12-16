/**
 * Converts an object to a URL query string.
 * @param obj - The object to convert.
 * @returns A URL query string representation of the object.
 *
 * This method takes an object as input and converts it into a URL query string format.
 * It filters out any properties with undefined, null, or empty string values, and then
 * constructs key-value pairs in the format 'key=value', joining them with '&' to form
 * the final query string.
 */
export function structQueryParams(obj: Record<string, unknown>): string {
  const query = Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return query;
}

