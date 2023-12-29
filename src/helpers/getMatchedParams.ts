export default function getMatchedParams(path: string): string[] {
  const params: string[] = [];
  path.replace(/\{(\w+)\}/g, (_match, word) => {
    params.push(word);
    return `:${word}`;
  });
  return params;
}
