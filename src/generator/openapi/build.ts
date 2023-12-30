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
          `export function ${operation?.operationId}<`,
          `  TReq extends RequestGenericInterface = {`,
          ...[ "params", "query", "body", "headers" ].map((part) => {
            const pascalPart = pascalCase(part);
            return `    ${pascalPart}: Types.${pascalCase(operation!.operationId!)}${pascalPart};`;
          }),
          `  },`,
          `  TRes extends ResponseGenericInterface = Record<string, unknown>`,
          `>(`,
          `  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>`,
          `): void`
        ].filter(Boolean).join("\n");

        return [
          new Block([
            `server.register<{ Req: TReq, Res: TRes }>("${method}", "${convertPath(path)}", async (req) => {`,
            `  return await factory(req);`,
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

        const queries = operation?.parameters?.flatMap((param) => {
          // TODO: support for $ref
          return "$ref" in param
            ? []
            : param.in === "query"
              ? [ param ]
              : [];
        }) ?? [];

        const headers = operation?.parameters?.flatMap((param) => {
          // TODO: support for $ref
          return "$ref" in param
            ? []
            : param.in === "header"
              ? [ param ]
              : [];
        }) ?? [];

        return [
          // params
          new Block([
            ...getMatchedParams(path).map((p) => `${p}: string;`)
          ], 1, `export type ${pascalCase(operation!.operationId!)}Params =`),
          // query
          new Block([
            ...queries.map((q) => `${q.name}${q.required ? "" : "?"}: string;`)
          ], 1, `export type ${pascalCase(operation!.operationId!)}Query =`),
          // body
          new Block([

          ], 1, `export type ${pascalCase(operation!.operationId!)}Body =`),
          // headers
          new Block([
            ...headers.map((q) => `${q.name}${q.required ? "" : "?"}: string;`)
          ], 1, `export type ${pascalCase(operation!.operationId!)}Headers =`)
        ];
      } else {
        return [];
      }
    });
  });

  // wrapping
  builderCodeSpace.insert([
    `import { HttpRequest, HttpResponse, RequestGenericInterface, ResponseGenericInterface } from "@breezy/dev";`,
    `import { server } from "./bootstrap";`,
    `import * as Types from "./types";`
  ]);

  builderCodeSpace.space(1);

  return {
    builderCode: formatBlockSpace(builderCodeSpace, builderBlocks),
    typeCode: formatBlockSpace(typeCodeSpace, typeBlocks)
  };
}
