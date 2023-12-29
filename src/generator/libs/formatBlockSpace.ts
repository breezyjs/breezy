import Block from "./Block";
import CodeSpace from "./CodeSpace";

export default function formatBlockSpace(codeSpace: CodeSpace, blocks: Block[]): string {
  blocks.forEach((block, i) => {
    codeSpace.insert([ block ]);

    if (i <= blocks.length - 2) {
      codeSpace.space(1);
    }
  });

  return `${codeSpace.build()}\n`;
}
