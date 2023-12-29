export default function parseHeaders(rawHeaders: string[]): Record<string, string> {
  const results: [string, string][] = [];
  const pair: string[] = [];
  rawHeaders.forEach((item, i) => {
    if (pair.length >= 2) {
      results.push(pair.splice(0, pair.length) as [string, string]);
    }

    pair.push(i % 2 === 0 ? item.toLowerCase() : item);
  });

  return Object.fromEntries(results);
}
