/**
 * Parses a raw filename by splitting it into parts based on the dot (.) character.
 *
 * @param rawFilename - The raw filename to be parsed.
 * @returns An object with 'parts' (array of filename parts) and 'ext' (file extension).
 */
export default function parseFilename(rawFilename: string) {
  const slices = rawFilename.split(".");

  return {
    parts: slices.slice(0, -1),
    ext: slices.at(-1) ?? null
  };
}
