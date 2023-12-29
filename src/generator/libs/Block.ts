import indentLines from "./indentLines";
import joinLines from "./joinLines";

export default class Block {
  /** Must start with 1. */
  private indentLevel: number;
  private indentSpace: string = "  ";
  private lines: (string | Block)[];
  private signature: string | null;

  constructor(lines: (string | Block)[] = [], indentLevel = 1, signature?: string) {
    this.indentLevel = indentLevel;
    this.lines = lines;
    this.signature = signature ?? null;
  }

  public insert(...lines: (string | Block)[]): void {
    this.lines.push(...lines);
  }

  public space(number: number): void {
    this.lines.push(..."\n".repeat(number));
  }

  private getBuiltIndent(): string {
    return this.indentSpace.repeat(this.indentLevel);
  }
  
  public build(): string {
    const openingBlock = [ this.signature, "{" ].filter(Boolean).join(" ");
    const closingBlock = [ "}" ].filter(Boolean).join(" ");
    
    return joinLines([
      openingBlock,
      ...this.lines.map((line) => {
        return typeof line === "string" ? `${this.getBuiltIndent()}${line}` : indentLines(line.build().split("\n"), this.indentLevel, this.indentSpace);
      }),
      closingBlock
    ]);
  }
}
