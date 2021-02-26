install:
	npm install

link:
	npm link

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

watch:
	npm run test:watch

publish:
	npm publish --dry-run

lint-fix:
	npx eslint . --fix

lint:
	npx eslint .