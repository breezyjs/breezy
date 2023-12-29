test:
	yarn dev generate --manifest tests/api/simple/.breezy.yaml
dev:
	yarn build && node dist/dev.js
serve:
	node server.js