/**
 * Concatenates an array of strings into a single string, separating each line with a newline character.
 *
 * @param {string[]} lines - An array of strings representing lines of text.
 * @returns {string} A single string formed by concatenating the input lines with newline characters between them.
 */
export default function joinLines(lines: string[]): string {
  return lines.reduce((acc, line, i) => {
    if (line === "\n" || i === lines.length - 1) {
      return acc + line;
    } else {
      return `${acc + line}\n`;
    }
  }, "");
}
