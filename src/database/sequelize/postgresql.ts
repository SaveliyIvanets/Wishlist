const { Sequelize } = require('sequelize')
const config = require('../../config')

const sequelize = new Sequelize({
  host: config.db.host || 'localhost',
  port: config.db.port || 5432,
  database: config.db.database || 'projectx',
  username: config.db.username || 'postgres',
  password: config.db.password || 'postgres',
  dialect: 'postgres',
})

module.exports = sequelize
export {}
