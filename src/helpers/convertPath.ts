export default function convertPath(input: string): string {
  return input.replace(/\{(\w+)\}/g, (_match, word) => `:${word}`);
}
