import Block from "./Block";
import joinLines from "./joinLines";

export default class CodeSpace {
  private lines: (string | Block)[] = [];

  public insert(lines: (string | Block)[]): void {
    this.lines.push(...lines);
  }

  public space(number: number): void {
    this.lines.push(..."\n".repeat(number));
  }

  build(): string {
    return joinLines(this.lines.map((line) => typeof line === "string" ? line : line.build()));
  }
}
