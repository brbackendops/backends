require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": process.env.DB,
    "logging": Boolean(process.env.DATABASE_LOGGING)
  },
  "test": {
    "username":  process.env.DATABASE_USERNAME,
    "password":  process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect":  process.env.DB
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
