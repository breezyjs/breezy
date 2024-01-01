import { OpenAPIV3 } from "openapi-types";

type PickedSchemaDescriptiveProperty =
  | "description"
  | "type"
  | "format"
  | "default"
  | "deprecated"
  | "example"
  | "readOnly";

type PickedSchemaConstraintProperty =
  | "minimum"
  | "exclusiveMinimum"
  | "maximum"
  | "exclusiveMaximum"
  | "multipleOf"
  | "maxLength"
  | "minLength"
  | "pattern"
  | "minItems"
  | "maxItems"
  | "uniqueItems"
  | "minProperties"
  | "maxProperties";

type Options = {
  isMultiLineForced: boolean;
} & Required<Pick<OpenAPIV3.SchemaObject, PickedSchemaDescriptiveProperty | PickedSchemaConstraintProperty>>;

type ConstraintOptions = Required<Pick<OpenAPIV3.SchemaObject, PickedSchemaConstraintProperty>>

export default function formatJSDoc(options: Partial<Options> = {}): string {
  if (Object.values(options).every((x) => !x)) {
    return "";
  }
  else {
    const {
      type,
      format,
      default: defaultValue,
      example,
      ...o
    } = options;

    const {
      description,
      isMultiLineForced,
      deprecated,
      readOnly,
      ...contraints
    } = o;

    const formattedConstraint = formatConstraints(contraints);

    const lines = [
      description || "",
      ...Object.entries({
        type,
        format,
        default: defaultValue,
        example
      }).map(([ tag, value ]) => value ? `@${tag} ${value}` : ""),
      formattedConstraint ? `@requires ${formattedConstraint}` : "",
      readOnly ? `@readonly` : "",
      deprecated ? `@deprecated` : ""
    ].filter(Boolean);

    if (lines.length === 0) {
      return "";
    } else if (isMultiLineForced || lines.length > 1) {
      return [
        "/**",
        ...lines.map((line) => ` * ${line}`),
        " */"
      ].join("\n");
    } else {
      return `/** ${lines.join("")} */`;
    }
  }
}

function formatConstraints(options: Partial<ConstraintOptions> = {}): string {
  if (Object.values(options).every((x) => !x)) {
    return "";
  }
  else {
    const {
      maximum,
      exclusiveMinimum,
      minimum,
      exclusiveMaximum,
      multipleOf,
      maxLength,
      minLength,
      pattern,
      minItems,
      maxItems,
      uniqueItems,
      maxProperties,
      minProperties
    } = options;

    const results: string[] = [];

    const hasMin = typeof minimum === "number" || typeof exclusiveMinimum === "number";
    const hasMax = typeof maximum === "number" || typeof exclusiveMaximum === "number";

    if (hasMin || hasMax) {
      const openBrace = typeof minimum === "number" ? "[" : "(";
      const closingBrace = typeof maximum === "number" ? "]" : ")";
      const min = hasMin ? String(minimum || exclusiveMinimum) : "-∞";
      const max = hasMax ? String(maximum || exclusiveMaximum) : "∞";

      const formattedInterval = `${openBrace}${min}, ${max}${closingBrace}`;
      const finalFormat = `be in range of ${formattedInterval}`;

      results.push(finalFormat);
    }
    if (typeof multipleOf === "number") {
      results.push(`be a multiple of ${multipleOf}`);
    }
    if (typeof minLength === "number") {
      const plural = minLength === 1 ? "character" : "characters";
      results.push(`have at least ${minLength} ${plural}`);
    }
    if (typeof maxLength === "number") {
      const plural = maxLength === 1 ? "character" : "characters";
      results.push(`not exceed ${maxLength} ${plural}`);
    }
    if (typeof pattern === "string") {
      results.push(`comply to /${pattern}/g pattern`);
    }
    if (typeof minItems === "number") {
      const plural = minItems === 1 ? "item" : "items";
      results.push(`have at least ${minItems} ${plural}`);
    }
    if (typeof maxItems === "number") {
      const plural = maxItems === 1 ? "item" : "items";
      results.push(`not exceed ${maxItems} ${plural}`);
    }
    if (uniqueItems === true) {
      results.push(`need its items to be unique`);
    }
    if (typeof minProperties === "number") {
      const plural = minProperties === 1 ? "property" : "properties";
      results.push(`have at least ${minProperties} ${plural}`);
    }
    if (typeof maxProperties === "number") {
      const plural = maxProperties === 1 ? "property" : "properties";
      results.push(`not exceed ${maxProperties} ${plural}`);
    }

    const finalFormat = results.slice(1).reduce((acc, x, i) => {
      return i === results.length - 2
        ? `${acc} and ${x}`
        : `${acc}, ${x}`;
    }, results.at(0));
    
    return `The value must ${finalFormat}.`;
  }
}
