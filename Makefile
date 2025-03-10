migrate-status:
	npx sequelize-cli db:migrate:status

migrate:
	npx sequelize-cli db:migrate --config src/infrastructure/config/config.js

dev:
	npm run dev

build:
	npm run clean && npm run build && npm run start