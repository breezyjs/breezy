import z from "zod";

export const ManifestSchema = z.object({
  output: z.string().optional(),
  openapiDefinition: z.string(),
  prismaSchema: z.string().optional(),
  bootstrap: z.string().optional(),
  generatedOutputDir: z.string().optional(),
  srcDir: z.string().optional()
});