export default function indentLines(lines: string[], indentLevel = 1, indentSpace = "  "): string {
  return lines.map((l) => `${indentSpace.repeat(indentLevel)}${l}`).join("\n");
}
