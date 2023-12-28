import { ManifestSchema } from "parser/manifest/schema";
import z from "zod";

export type CliOptions = {
  manifest: string;
  output?: string;
  source?: string;
  version?: boolean;
  help?: boolean;
}

export type ManifestOptions = z.infer<typeof ManifestSchema>