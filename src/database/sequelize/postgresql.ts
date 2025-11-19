import { Sequelize } from 'sequelize-typescript';
import config from "../../config.json";

const sequelize = new Sequelize({
  host: config.db.host || 'localhost',
  port:  Number(config.db.port) || 5432,
  database: config.db.database || 'projectx',
  username: config.db.username || 'postgres',
  password: config.db.password || 'postgres',
  dialect: 'postgres',
})

export default sequelize;
