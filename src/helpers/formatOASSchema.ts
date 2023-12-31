import Block from "generator/libs/Block";
import { OpenAPIV3 } from "openapi-types";
import formatRefObject from "./formatRefObject";
import formatJSDoc from "./formatJSDoc";

type Result = {
  jsDoc: string;
  result: string;
}

/** Turns OpenAPI Schema Object into TypeScript types, displaying in string format. */
export default function formatOASSchema(schemaObject: OpenAPIV3.SchemaObject): string {
  if (schemaObject.type === "object" && schemaObject.properties) {
    const block = new Block({
      indentLevel: 1
    });

    const requiredPropNames = schemaObject.required ?? [];

    const lines = Object.entries(schemaObject.properties).flatMap(([ propName, schema ]) => {
      const q = requiredPropNames.includes(propName) ? "" : "?";

      if ("$ref" in schema) {
        return [
          `${propName}${q}: ${formatRefObject(schema)};`
        ];
      } else {
        const jsDoc = formatJSDoc({
          description: schema.description,
          deprecated: schema.deprecated,
          type: schema.type,
          format: schema.format,
          default: schema.default,
          example: schema.example,
          isMultiLineForced: true
        });

        return [
          ...jsDoc.split("\n"),
          ...`${propName}${q}: ${formatOASSchema(schema)};`.split("\n")
        ].filter(Boolean);
      }
    });

    block.insert(lines);

    return block.build();
  } else {
    const orNullable = schemaObject.nullable ? " | null" : "";

    if (schemaObject.type === "array") {
      const itemsType = "$ref" in schemaObject.items
        ? formatRefObject(schemaObject.items)
        : formatOASSchema(schemaObject.items);

      return itemsType.includes("|")
        ? `(${itemsType})[]${orNullable}`
        : `${itemsType}[]${orNullable}`;
    } else if (schemaObject.type === "integer" || schemaObject.type === "number") {
      return `number${orNullable}`;
    } else if (schemaObject.enum) {
      // TODO: add note for this to handle with non specific type: https://json-schema.org/understanding-json-schema/reference/enum
      return `${schemaObject.enum.map((e) => schemaObject.type === "string" ? `"${e}"` : e).join(" | ")}${orNullable}`;
    } else {
      return `${schemaObject.type}${orNullable}`;
    }
  }
}
