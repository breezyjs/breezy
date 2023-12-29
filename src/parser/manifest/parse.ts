import readAndDeserialize from "helpers/readAndDeserialize";
import { ManifestSchema } from "./schema";

export default function parse(path: string) {
  const data = readAndDeserialize(path);

  // TODO: add error handler
  const parsedData = ManifestSchema.parse(data);

  return parsedData;
}
