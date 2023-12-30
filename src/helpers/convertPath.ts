/**
 * Converts a path string with curly braces containing words into a format commonly used in routing frameworks.
 * Replaces each occurrence of "{word}" with ":word".
 *
 * @param input - The input path string to be converted.
 * @returns The converted path string.
 */
export default function convertPath(input: string): string {
  return input.replace(/\{(\w+)\}/g, (_match, word) => `:${word}`);
}
