import { pascalCase } from "change-case";
import { METHODS } from "common/constants";
import Block from "generator/libs/Block";
import CodeSpace from "generator/libs/CodeSpace";
import formatBlockSpace from "generator/libs/formatBlockSpace";
import convertPath from "helpers/convertPath";
import getMatchedParams from "helpers/getMatchedParams";
import { OpenAPIV3 } from "openapi-types";

type BuildResult = {
  builderCode: string;
  typeCode: string;
}

export default function build(document: OpenAPIV3.Document): BuildResult {
  const builderCodeSpace = new CodeSpace();
  const typeCodeSpace = new CodeSpace();

  // builders
  const builderBlocks = Object.entries(document.paths).flatMap(([ path, pathItem = {} ]) => {
    return METHODS.flatMap((method) => {
      if (method in pathItem && pathItem[method]) {
        const operation = pathItem[method];
        const signature = [
          operation?.description ? `/** ${operation.description} */` : null,
          `export function ${operation?.operationId}(factory: (request: T.Request) => Promise<T.Response>): void`
        ].filter(Boolean).join("\n");

        return [
          new Block([
            `fastify.${method}("${convertPath(path)}", async (request, reply) => {`,
            `  return sendResponse(await factory(transformRequest(request)), reply);`,
            `});`
          ], 1, signature)
        ];
      } else {
        return [];
      }
    });
  });

  // types
  const typeBlocks = Object.entries(document.paths).flatMap(([ path, pathItem = {} ]) => {
    return METHODS.flatMap((method) => {
      if (method in pathItem && pathItem[method]) {
        const operation = pathItem[method];

        return [
          // params
          new Block([
            ...getMatchedParams(path).map((param) => `${param}: string`)
          ], 1, `export type ${pascalCase(operation!.operationId!)}${pascalCase(method)}Params =`),
          // query
          new Block([
            
          ], 1, `export type ${pascalCase(operation!.operationId!)}${pascalCase(method)}Query =`),
          // body
          new Block([
            
          ], 1, `export type ${pascalCase(operation!.operationId!)}${pascalCase(method)}Body =`),
          // headers
          new Block([
            
          ], 1, `export type ${pascalCase(operation!.operationId!)}${pascalCase(method)}Headers =`)
        ];
      } else {
        return [];
      }
    });
  });

  // wrapping
  builderCodeSpace.insert([
    `import { fastify } from "./bootstrap"`,
    `import { transformRequest, sendResponse } from "./helpers"`,
    `import * as T from "./types"`
  ]);

  builderCodeSpace.space(1);

  return {
    builderCode: formatBlockSpace(builderCodeSpace, builderBlocks),
    typeCode: formatBlockSpace(typeCodeSpace, typeBlocks)
  };
}
