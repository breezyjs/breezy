import { parse } from "ts-command-line-args";
import { match } from "ts-pattern";
import isValid from "is-valid-path";
import { CliOptions } from "types/common";
import generateOpenApi from "generator/openapi/generate";
import parseManifest from "parser/manifest/parse";
import { CommandKey } from "common/enums";
import throwErr from "helpers/throwErr";

function main(command: string | null, args: CliOptions): void {
  if (!isValid(args.manifest)) {
    throwErr(`error: invalid path '${args.manifest}'`);
  }

  const manifest = parseManifest(args.manifest);

  // console.log(manifest);

  match({ command, ...args })
    .with({ version: true }, () => console.log(__VERSION__))
    .with({ command: CommandKey.Generate }, () => generateOpenApi({ ...manifest, ...args }))
    .with({ command: CommandKey.Build }, () => null)
    .otherwise(() => {
      // parse(args);
      console.log("otherwise");
    });
}

const firstOptionArgIdx = process.argv.findIndex((x) => x.startsWith("-"));
const observedCommandArg = process.argv.at(firstOptionArgIdx === -1 ? -1 : firstOptionArgIdx - 1);
const hasObservedCommandArg = Boolean(observedCommandArg && Object.values<string>(CommandKey).includes(observedCommandArg));
const firstCommandArgIdx = process.argv.findIndex((x) => Object.values<string>(CommandKey).includes(x));

main(
  hasObservedCommandArg ? observedCommandArg! : null,
  parse<CliOptions>(
    {
      manifest: { type: String, defaultValue: "./.breezyrc", typeLabel: "<path>", description: "Specify the path to the desired `.breezyrc.yaml` file instead of the default path" },
      output: { type: String, optional: true, alias: "o", typeLabel: "<filename>", description: "Write output to <filename>" },
      source: { type: String, optional: true, alias: "s", typeLabel: "<directory>", description: "Specify the path to the source directory to be compiled. Default is `./src`" },
      version: { type: Boolean, optional: true, alias: "v", description: "Print version" },
      help: { type: Boolean, optional: true, alias: "h", description: "Print help" }
    },
    {
      helpArg: "help",
      ...(firstCommandArgIdx !== -1 && {
        argv: process.argv.slice(firstOptionArgIdx === -1 ? process.argv.length : firstOptionArgIdx)
      }),
      ...(firstCommandArgIdx === -1 && firstOptionArgIdx === -1 && {
        argv: [ "-h" ]
      })
    }
  )
);
