export default function joinLines(lines: string[]): string {
  return lines.reduce((acc, line, i) => {
    if (line === "\n" || i === lines.length - 1) {
      return acc + line;
    } else {
      return `${acc + line}\n`;
    }
  }, "");
}
