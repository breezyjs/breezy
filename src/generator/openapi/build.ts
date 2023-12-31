import { pascalCase } from "change-case";
import { METHODS } from "common/constants";
import Block from "generator/libs/Block";
import formatBlockSpace from "generator/libs/formatBlockSpace";
import indentLines from "generator/libs/indentLines";
import convertPath from "helpers/convertPath";
import formatOASSchema from "helpers/formatOASSchema";
import getMatchedParams from "helpers/getMatchedParams";
import refDocument from "helpers/refDocument";
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
      const operation = pathItem[method];
      if (method in pathItem && operation) {
        const hasQuery = true;
        const hasParams = Boolean(getMatchedParams(path).length);
        const hasBody = Boolean(operation.requestBody);
        const hasHeaders = true;

        const queries = operation.parameters?.flatMap((param) => {
          return "$ref" in param
            ? [ refDocument<Exclude<typeof param, OpenAPIV3.ReferenceObject>>(document, param.$ref)! ]
            : param.in === "query"
              ? [ param ]
              : [];
        }) ?? [];

        const headers = operation.parameters?.flatMap((param) => {
          return "$ref" in param
            ? [ refDocument<Exclude<typeof param, OpenAPIV3.ReferenceObject>>(document, param.$ref)! ]
            : param.in === "header"
              ? [ param ]
              : [];
        }) ?? [];

        return [
          {
            builders: [
              new Block({
                prepend: [
                  operation.description ? `/** ${operation.description} */` : null,
                  `export function ${operation.operationId}<`,
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
                ].filter(Boolean).join("\n"),
                lines: [
                  `server.register<{ Req: TReq, Res: TRes }>("${method}", "${convertPath(path)}", async (req) => {`,
                  `  return await factory(req);`,
                  `});`
                ],
                indentLevel: 1
              })
            ],
            types: [
              // params
              ...(hasParams ? [
                new Block({
                  prepend: `export type ${pascalCase(operation!.operationId!)}Params = `,
                  lines: getMatchedParams(path).map((p) => `${p}: string;`),
                  indentLevel: 1
                })
              ] : []),
              // query
              ...(hasQuery ? [
                new Block({
                  prepend: `export type ${pascalCase(operation!.operationId!)}Query = `,
                  lines: queries.flatMap((obj) => [
                    obj.description ? `/** ${obj.description} */` : "",
                    `${obj.name}${obj.required ? "" : "?"}: string;`
                  ].filter(Boolean)),
                  indentLevel: 1
                })
              ] : []),
              // body
              ...(hasBody ? [
                new Block({
                  prepend: `export type ${pascalCase(operation!.operationId!)}Body = `,
                  lines: [],
                  indentLevel: 1
                })
              ] : []),
              // headers
              ...(hasHeaders ? [
                new Block({
                  prepend: `export type ${pascalCase(operation!.operationId!)}Headers = `,
                  lines: headers.flatMap((obj) => [
                    obj.description ? `/** ${obj.description} */` : "",
                    `${obj.name}${obj.required ? "" : "?"}: string;`
                  ].filter(Boolean)),
                  indentLevel: 1
                })
              ] : [])
            ]
          }
        ];
      } else {
        return [];
      }
    });
  });

  const componentBlocksResult = buildDocumentComponent(document.components);

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
    componentCode: formatBlockSpace(componentCodeSpace, Object.values(componentBlocksResult).flat())
  };
}

function buildDocumentComponent(components?: OpenAPIV3.ComponentsObject) {
  const schemaBlocks = Object.entries(components?.schemas ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [
        new Block({
          prepend: `export type ${pascalCase(name)}Schema = `,
          lines: formatOASSchema(schemaObject).split("\n"),
          isSameLine: true
        })
      ];
    }
  });

  const responseBlocks = Object.entries(components?.responses ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const parameterBlocks = Object.entries(components?.parameters ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const exampleBlocks = Object.entries(components?.examples ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const requestBodyBlocks = Object.entries(components?.requestBodies ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const headerBlocks = Object.entries(components?.headers ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const securitySchemeBlocks = Object.entries(components?.securitySchemes ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const linkBlocks = Object.entries(components?.links ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  const callbackBlocks = Object.entries(components?.callbacks ?? {}).flatMap(([ name, schemaObject ]) => {
    if ("$ref" in schemaObject) {
      return [];
    } else {
      return [];
    }
  });

  // TODO: OAS 3.1: pathItems

  return {
    schemaBlocks,
    responseBlocks,
    parameterBlocks,
    exampleBlocks,
    requestBodyBlocks,
    headerBlocks,
    securitySchemeBlocks,
    linkBlocks,
    callbackBlocks
  };
}
