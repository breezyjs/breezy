export default function parseFilename(rawFilename: string) {
  const slices = rawFilename.split(".");

  return {
    parts: slices.slice(0, -1),
    ext: slices.at(-1) ?? null
  };
}
