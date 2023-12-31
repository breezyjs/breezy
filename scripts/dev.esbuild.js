const { build } = require("esbuild");
const fs = require("fs");

build({
  entryPoints: ["packages/dev/test.ts"],
  minify: true,
  sourcemap: true,
  bundle: true,
  platform: "node",
  target: ["node20"],
  packages: "external",
  outfile: "dist/dev.js",
});