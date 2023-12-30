import { pascalCase } from "change-case";
import { METHODS } from "common/constants";
import Block from "generator/libs/Block";
import formatBlockSpace from "generator/libs/formatBlockSpace";
import indentLines from "generator/libs/indentLines";
import convertPath from "helpers/convertPath";
import formatOASSchema from "helpers/formatOASSchema";
import getMatchedParams from "helpers/getMatchedParams";
import { OpenAPIV3 } from "openapi-types";

type BuildResult = {
  builderCode: string;
  typeCode: string;
  componentCode: string;
}

export default function build(document: OpenAPIV3.Document): BuildResult {
  const builderCodeSpace = new Block();
  const typeCodeSpace = new Block();
  const componentCodeSpace = new Block();

  // paths
  const blocks = Object.entries(document.paths).flatMap(([ path, pathItem = {} ]) => {
    return METHODS.flatMap((method) => {
      if (method in pathItem && pathItem[method]) {
        const operation = pathItem[method];

        // types
        const hasQuery = true;
        const hasParams = Boolean(getMatchedParams(path).length);
        const hasBody = Boolean(operation?.requestBody);
        const hasHeaders = true;

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
            ? [ ]
            : param.in === "header"
              ? [ param ]
              : [];
        }) ?? [];

        // builders
        const signature = [
          operation?.description ? `/** ${operation.description} */` : null,
          `export function ${operation?.operationId}<`,
          `  TReq extends RequestGenericInterface = {`,
          indentLines(Object.entries({
            params: hasParams,
            query: hasQuery,
            body: hasBody,
            headers: hasHeaders
          }).flatMap(([ part, shouldInclude ]) => {
            if (shouldInclude) {
              const pascalPart = pascalCase(part);
              return [ `${pascalPart}: Types.${pascalCase(operation!.operationId!)}${pascalPart};` ];
            } else {
              return [];
            }
          }), 2),
          `  },`,
          `  TRes extends ResponseGenericInterface = Record<string, unknown>`,
          `>(`,
          `  factory: (request: HttpRequest<TReq>) => Promise<Partial<HttpResponse<TRes>>>`,
          `): void `
        ].filter(Boolean).join("\n");

        return [
          {
            builders: [
              new Block([
                `server.register<{ Req: TReq, Res: TRes }>("${method}", "${convertPath(path)}", async (req) => {`,
                `  return await factory(req);`,
                `});`
              ], 1, signature)
            ],
            types: [
              // params
              ...(hasParams ? [
                new Block([
                  ...getMatchedParams(path).map((p) => `${p}: string;`)
                ], 1, `export type ${pascalCase(operation!.operationId!)}Params = `)
              ] : []),
              // query
              ...(hasQuery ? [
                new Block([
                  ...queries.map((q) => `${q.name}${q.required ? "" : "?"}: string;`)
                ], 1, `export type ${pascalCase(operation!.operationId!)}Query = `)
              ] : []),
              // body
              ...(hasBody ? [
                new Block([
    
                ], 1, `export type ${pascalCase(operation!.operationId!)}Body = `)
              ] : []),
              // headers
              ...(hasHeaders ? [
                new Block([
                  ...headers.map((q) => `${q.name}${q.required ? "" : "?"}: string;`)
                ], 1, `export type ${pascalCase(operation!.operationId!)}Headers = `)
              ] : [])
            ]
          }
        ];
      } else {
        return [];
      }
    });
  });

  // components – schema
  const schemaBlocks = Object.entries(document.components?.schemas ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [
        new Block([
          ...formatOASSchema(schemaObject).split("\n")
        ], 1, `export type ${pascalCase(name)}Schema = `)
      ];
    }
  });

  // wrapping
  builderCodeSpace.insert([
    `import { HttpRequest, HttpResponse, RequestGenericInterface, ResponseGenericInterface } from "@breezy/dev";`,
    `import { server } from "./bootstrap";`,
    `import * as Types from "./types";`
  ]);

  builderCodeSpace.space(1);

  return {
    builderCode: formatBlockSpace(builderCodeSpace, blocks.flatMap((x) => x.builders)),
    typeCode: formatBlockSpace(typeCodeSpace, blocks.flatMap((x) => x.types)),
    componentCode: formatBlockSpace(componentCodeSpace, [
      ...schemaBlocks
    ])
  };
}
