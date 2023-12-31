import { pascalCase } from "change-case";
import { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

const OBJ_NAME_MAP: Record<keyof OpenAPIV3_1.ComponentsObject, string> = {
  schemas: "Schema",
  responses: "Response",
  parameters: "Parameter",
  examples: "Example",
  requestBodies: "RequestBody",
  headers: "Header",
  securitySchemes: "SecurityScheme",
  links: "Link",
  callbacks: "Callback",
  pathItems: "PathItem"
} as const;

/** Turns OpenAPI Reference Object into a TypeScript type. */
export default function formatRefObject(refObject: OpenAPIV3.ReferenceObject): string {
  const ref = refObject["$ref"];
  
  const parts = ref.split("/").filter((part) => ![ "#", "components" ].includes(part));
  const mappedName = parts[0] ? OBJ_NAME_MAP[parts[0] as keyof typeof OBJ_NAME_MAP] : "Unscoped";

  return `${pascalCase(parts[1]!)}${mappedName}`;
}
