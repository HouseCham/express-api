require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: path.join(__dirname, '../db/migrations.json'),  // Store migration history
    seederStorage: 'json',
    seederStoragePath: path.join(__dirname, '../db/seeders.json')         // Store seeder history
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: path.join(__dirname, '../db/migrations.json'),  // Store migration history
    seederStorage: 'json',
    seederStoragePath: path.join(__dirname, '../db/seeders.json')         // Store seeder history
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: path.join(__dirname, '../db/migrations.json'),  // Store migration history
    seederStorage: 'json',
    seederStoragePath: path.join(__dirname, '../db/seeders.json')         // Store seeder history
  }
};
