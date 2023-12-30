import Block from "./Block";

export default function formatBlockSpace(space: Block, blocks: Block[]): string {
  blocks.forEach((block, i) => {
    space.insert([ block ]);

    if (i <= blocks.length - 2) {
      space.space(1);
    }
  });

  return `${space.build()}\n`;
}
