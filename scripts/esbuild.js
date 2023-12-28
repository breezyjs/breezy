const { build } = require("esbuild");
const { replace } = require('esbuild-plugin-replace');
const fs = require("fs");

const packageManifest = JSON.parse(fs.readFileSync("package.json", "utf-8"));

build({
  plugins: [
    replace({
      __VERSION__: `"${packageManifest.version}"`,
    })
  ],
  entryPoints: ["src/index.ts"],
  minify: true,
  sourcemap: true,
  bundle: true,
  platform: "node",
  target: ["node20"],
  packages: "external",
  outfile: "dist/index.js",
});