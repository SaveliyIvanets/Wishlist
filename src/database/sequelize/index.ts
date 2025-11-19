import config = require("../../config.json")

if (!['sqlite', 'postgresql'].includes(config.db.databaseEngine)) {
  throw new Error(`проблема с databaseEngine:\n ${config.db.databaseEngine}`)
}

const sequelize =
  config.db.databaseEngine === 'postgresql'
    ? require('./postgresql')
    : require('./sqlite')

module.exports = sequelize
