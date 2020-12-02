install:
	npm install

link:
	sudo npm link

test:
	npm run test

watch:
	npm run test:watch

publish:
	npm publish --dry-run

lint-fix:
	npx eslint . --fix

lint:
	npx eslint .