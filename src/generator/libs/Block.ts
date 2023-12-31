import joinLines from "./joinLines";

type LineOptions = {
  indentLevel: number;
  indentSpace: string;
  isSameLine: boolean;
  lines: (string | Block)[];
  append: string | null;
  prepend: string | null;
}

export default class Block {
  /** Can start with 0. 0 means code space (without braces). */
  private indentLevel: number;
  /** Space amount to indicate 1 tab or 1 level indentation. */
  private indentSpace: string;
  /** Should the open and closing braces align the same line with content lines? */
  private isSameLine: boolean;
  /** Content lines inside braces. */
  private lines: (string | Block)[];
  /** The string appending to the closing brace. */
  private append: string | null;
  /** The string prepending to the open brace. */
  private prepend: string | null;

  constructor(options: Partial<LineOptions> = {}) {
    this.indentLevel = options.indentLevel ?? 0;
    this.indentSpace = options.indentSpace ?? "  ";
    this.isSameLine = options.isSameLine ?? false;
    this.lines = options.lines ?? [];
    this.append = options.append ?? null;
    this.prepend = options.prepend ?? null;
  }

  public setOptions(options: Partial<LineOptions> = {}): void {
    this.indentLevel = options.indentLevel ?? this.indentLevel;
    this.indentSpace = options.indentSpace ?? this.indentSpace;
    this.isSameLine = options.isSameLine ?? this.isSameLine;
    this.lines = options.lines ?? this.lines;
    this.append = options.append ?? this.append;
    this.prepend = options.prepend ?? this.prepend;
  }

  public insert(lines: (string | Block)[]): void {
    this.lines.push(...lines);
  }

  public space(number: number): void {
    this.lines.push(..."\n".repeat(number));
  }
  
  /** Turns a block into stirng. */
  public build(): string {
    const braceIndent = this.indentSpace.repeat(Math.max(0, this.indentLevel - 1));
    const contentIndent = this.indentSpace.repeat(this.indentLevel);
    const openingBlock = [ this.isSameLine ? "" : braceIndent, this.prepend, this.indentLevel > 0 ? "{" : "" ].filter(Boolean).join("");
    const closingBlock = [ this.isSameLine ? "" : braceIndent, this.indentLevel > 0 ? "}" : "", this.append ].filter(Boolean).join("");

    const lines = this.lines.map((line) => (
      typeof line === "string"
        ? `${contentIndent}${line}`
        : line.build()
    ));

    return this.isSameLine
      ? [
        openingBlock,
        joinLines(lines),
        closingBlock
      ].join("")
      : joinLines([
        openingBlock,
        ...lines,
        closingBlock
      ].filter(Boolean));
  }
}
