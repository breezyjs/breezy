const { build } = require("esbuild");
const { replace } = require('esbuild-plugin-replace');
const { compress } = require('brotli');
const fs = require("fs");

const packageManifest = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const templates = {
  bootstrap: fs.readFileSync("src/assets/templates/bootstrap.ts"),
  helpers: fs.readFileSync("src/assets/templates/helpers.ts"),
  types: fs.readFileSync("src/assets/templates/types.ts")
};

build({
  plugins: [
    replace({
      __VERSION__: `"${packageManifest.version}"`,
      ...Object.fromEntries(
        Object.entries(templates).map(([key, c]) => (
          [`__TEMPLATE_${key.toUpperCase()}__`, `"${Buffer.from(compress(c, { mode: 1 })).toString("base64")}"`]
        ))
      )
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