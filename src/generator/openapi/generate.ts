import readAndDeserialize from "helpers/readAndDeserialize";
import throwErr from "helpers/throwErr";
import OpenAPISchemaValidator from "openapi-schema-validator";
import * as path from "path";
import * as fs from "fs";
import semverMajor from "semver/functions/major";
import semverMinor from "semver/functions/minor";
import { CliOptions, ManifestOptions } from "types/common";
import { OpenAPIV3 } from "openapi-types";
import lint from "generator/openapi/lint";
import build from "./build";
import { decompress } from "brotli";

/** Generates an OpenAPI definition into TypeScript handler factories, DTOs, and validators. */
export default function generate(option: CliOptions & ManifestOptions) {
  const openapiDefinitionPath = path.join(option.manifest, "..", option.openapiDefinition);

  // FIXME: should be dynamic version
  const document = readAndDeserialize<OpenAPIV3.Document>(openapiDefinitionPath);
  const openapiVersion = document.openapi;

  if (!openapiVersion) {
    throwErr("error: OpenAPI definition needs to specify the version");
  }
  if (semverMajor(openapiVersion) !== 3 && semverMinor(openapiVersion) !== 0) {
    throwErr(`error: unsupported OpenAPI version '${openapiVersion}'`);
  }
  
  const validator = new OpenAPISchemaValidator({
    version: semverMajor(openapiVersion)
  });

  const validationResult = validator.validate(document);

  if (validationResult.errors.length) {
    throwErr(validationResult.errors.map((e) => `error: ${e.message}`).join("\n"));
  }

  const lintingResult = lint(document);

  if (lintingResult.errors.length) {
    throwErr(lintingResult.errors.map((e) => `error: ${e.message}`).join("\n"));
  }

  const buildResult = build(document);

  const outputDir = path.join(option.manifest, "..", option.generatedOutputDir);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "builders.ts"), buildResult.builderCode);
  fs.writeFileSync(path.join(outputDir, "bootstrap.ts"), decompress(Buffer.from(__TEMPLATE_BOOTSTRAP__, "base64")));
  fs.writeFileSync(path.join(outputDir, "types.ts"), [ buildResult.componentCode, buildResult.typeCode ].join("\n"));
}
