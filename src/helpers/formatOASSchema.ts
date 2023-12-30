import Block from "generator/libs/Block";
import CodeSpace from "generator/libs/CodeSpace";
import { OpenAPIV3 } from "openapi-types";

/** Turns OpenAPI Schema Object into TypeScript types, displaying in string format. */
export default function formatOASSchema(schemaObject: OpenAPIV3.SchemaObject): string {
  const codeSpace = new CodeSpace();

  codeSpace.insert([
    `{`,
    `}`
  ]);

  return "";
}
