import { OpenAPIV3 } from "openapi-types";

export default function refDocument<T>(document: OpenAPIV3.Document, refString: string): T | null {
  const parts = refString.split("/").filter((part) => part !== "#");

  return parts.reduce((acc: any, part) => (acc && acc[part]) ?? null, document) as T;
}
