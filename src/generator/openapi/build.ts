import { METHODS } from "common/constants";
import Block from "generator/libs/Block";
import CodeSpace from "generator/libs/CodeSpace";
import { OpenAPIV3 } from "openapi-types";

export default function build(document: OpenAPIV3.Document): string {
  const codeSpace = new CodeSpace();

  const blocks = Object.entries(document.paths).flatMap(([ , pathItem = {} ]) => {
    return METHODS.flatMap((method) => {
      if (method in pathItem && pathItem[method]) {
        const operation = pathItem[method];
        const signature = [
          operation?.description ? `/** ${operation.description} */` : null,
          `export function ${operation?.operationId}(factory: any)`
        ].filter(Boolean).join("\n");

        return [
          new Block([], 1, signature)
        ];
      } else {
        return [];
      }
    });
  });

  blocks.forEach((block, i) => {
    codeSpace.insert([ block ]);

    if (i <= blocks.length - 2) {
      codeSpace.space(1);
    }
  });

  return `${codeSpace.build()}\n`;
}
