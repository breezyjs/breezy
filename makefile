run:
	node scripts/esbuild.js
	node dist/index.js generate --manifest tests/api/simple/.breezy.yaml
dev:
	node scripts/dev.esbuild.js
	node dist/dev.js
serve:
	node server.js