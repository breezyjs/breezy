/**
 * Extracts parameter names from a path string with curly braces and returns them in an array.
 *
 * @param path - The input path string containing placeholders.
 * @returns An array of parameter names extracted from the path.
 */
export default function getMatchedParams(path: string): string[] {
  const params: string[] = [];
  path.replace(/\{(\w+)\}/g, (_match, word) => {
    params.push(word);
    return `:${word}`;
  });
  return params;
}
