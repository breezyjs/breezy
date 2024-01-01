import Block from "generator/libs/Block";
import { OpenAPIV3 } from "openapi-types";
import formatRefObject from "./formatRefObject";
import formatJSDoc from "./formatJSDoc";

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
          // annotation
          description: schema.description,
          deprecated: schema.deprecated,
          type: schema.type,
          format: schema.format,
          default: schema.default,
          example: schema.example,
          // number
          minimum: schema.minimum,
          exclusiveMinimum: schema.exclusiveMinimum,
          maximum: schema.maximum,
          exclusiveMaximum: schema.exclusiveMaximum,
          multipleOf: schema.multipleOf,
          // string
          maxLength: schema.maxLength,
          minLength: schema.minLength,
          pattern: schema.pattern,
          // array
          maxItems: schema.maxItems,
          minItems: schema.minItems,
          uniqueItems: schema.uniqueItems,
          // object
          minProperties: schema.minProperties,
          maxProperties: schema.maxProperties,
          // others
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

      const hasMin = typeof schemaObject.minItems === "number";
      const hasMax = typeof schemaObject.maxItems === "number";
      const hasOnlyMax = !hasMin && hasMax;
      const isEqualSize = hasMin && hasMax && schemaObject.minItems === schemaObject.maxItems;

      // TODO:
      if ((hasMin || hasMax || isEqualSize) && !hasOnlyMax) {

      } else {

      }

      return itemsType.includes("|")
        ? `(${itemsType})[]${orNullable}`
        : `${itemsType}[]${orNullable}`;
    } else if (schemaObject.type === "integer" || schemaObject.type === "number") {
      return `number${orNullable}`;
    } else if (schemaObject.enum) {
      return `${schemaObject.enum.map((e) => typeof e === "string" ? `"${e}"` : e).join(" | ")}${orNullable}`;
    } else {
      return `${schemaObject.type}${orNullable}`;
    }
  }
}
