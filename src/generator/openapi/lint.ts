import { METHODS } from "common/constants";
import { OpenAPIV3 } from "openapi-types";

type OpenAPILintingResult = {
  errors: {
    message: string;
  }[]
}

export default function lint(document: OpenAPIV3.Document): OpenAPILintingResult {
  const errors = Object.entries(document.paths).flatMap(([ path, pathItem = {} ]) => {
    return METHODS.flatMap((method) => {
      if (method in pathItem && !pathItem[method]?.operationId) {
        return [{
          message: `${method.toUpperCase()} ${path} is missing 'operationId'`
        }];
      } else {
        return [];
      }
    });
  });

  return {
    errors
  };
}
