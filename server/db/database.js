require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'testdb',
    host: process.env.DB_HOST || 'host.docker.internal',
    port: Number(process.env.DB_PORT) || 5434,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '123',
    database: `${process.env.DB_NAME || 'testdb'}_test`,
    host: process.env.DB_HOST || 'host.docker.internal',
    port: Number(process.env.DB_PORT) || 5434,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '123',
    database: process.env.DB_NAME || 'testdb',
    host: process.env.DB_HOST || 'host.docker.internal',
    port: Number(process.env.DB_PORT) || 5434,
    dialect: 'postgres',
    logging: false
  }
};
