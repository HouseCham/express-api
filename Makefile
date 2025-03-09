migrate-status:
	npx sequelize-cli db:migrate:status

migrate:
	npx sequelize-cli db:migrate --config src/infrastructure/config/config.js
