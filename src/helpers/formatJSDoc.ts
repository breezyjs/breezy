type Options = {
  description: string;
  type: string;
  format: string;
  default: string;
  example: string;
  deprecated: boolean;
  isMultiLineForced: boolean;
}

export default function formatJSDoc(options: Partial<Options> = {}): string {
  if (Object.values(options).every((x) => !x)) {
    return "";
  }
  else {
    const { description, isMultiLineForced, deprecated, ...blockTags } = options;

    const lines = [
      description || "",
      deprecated ? `@deprecated` : "",
      ...Object.entries(blockTags).map(([ tag, value ]) => value ? `@${tag} ${value}` : "")
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
