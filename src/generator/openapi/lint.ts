import { OpenAPIV3 } from "openapi-types";

type OpenAPILintingResult = {
  errors: {
    message: string;
  }[]
}

const METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"] as const;

export default function lint(document: OpenAPIV3.Document): OpenAPILintingResult {
  const errors = Object.entries(document.paths).flatMap(([path, pathItem = {}]) => {
    return METHODS.flatMap((method) => {
      if (method in pathItem && !pathItem[method]?.operationId) {
        return [{
          message: `${method.toUpperCase()} ${path} is missing 'operationId'`
        }]
      } else {
        return []
      }
    });
  })

  return {
    errors
  }
}