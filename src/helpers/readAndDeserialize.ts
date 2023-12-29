import * as fs from "fs";
import YAML from "yaml";
import parseFilename from "./parseFilename";
import throwErr from "./throwErr";
import tryThrow from "./tryThrow";

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
