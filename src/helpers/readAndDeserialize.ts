import * as fs from "fs";
import YAML from "yaml";
import parseFilename from "./parseFilename";
import throwErr from "./throwErr";
import tryThrow from "./tryThrow";

/**
 * Reads the content of a file specified by the given path and deserializes it based on the file extension.
 *
 * @param path - The path to the file to be read and deserialized.
 * @returns The deserialized content of the file.
 */
export default function readAndDeserialize<T = any>(path: string): T {
  const raw = tryThrow(() => fs.readFileSync(path, "utf-8"), (err) => err.message);
  const { ext } = parseFilename(path);

  if ([ "yaml", "yml" ].includes(ext || "")) {
    return YAML.parse(raw) as T;
  }
  if (ext === "json") {
    return JSON.parse(raw) as T;
  }
  
  throwErr("error: invalid file extension");
  throw new Error();
}
