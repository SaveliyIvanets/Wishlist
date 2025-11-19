const sequelize = require('./sequelize')
const bcrypt = require('bcrypt')
import { ModelStatic, Model } from 'sequelize';
interface AppModelStatic<T extends Model> extends ModelStatic<T> {
  associate?: (models: Record<string, ModelStatic<Model>>) => void;
}

interface AppModels {
  Task: AppModelStatic<Model>;
  User: AppModelStatic<Model>;
  Role: AppModelStatic<Model>;
  [key: string]: AppModelStatic<Model>;
}

const models: AppModels = {
  Task: require('./models/task').default,
  User: require('./models/user').default,
  Role: require('./models/role').default,
};
const repository = require('./repository/sequelizeRepository')
const initDb = async () => {
  try {
    await sequelize.authenticate()

    for (const title of Object.keys(models)) {
      const model = models[title]
      if (model.associate) model.associate(models)
    }
    await sequelize.sync()

    const userRepository = new repository(models.User)
    const roleRepository = new repository(models.Role)

    let adminRole = null
    let userRole = null
    let admin = null
    try {
      adminRole = await roleRepository.findOne({ role: 'admin' })
      userRole = await roleRepository.findOne({ role: 'user' })
      admin = await userRepository.findOne({ username: 'admin' })
    } catch (e) {
      console.error(e)
    }

    if (!adminRole) {
      adminRole = await roleRepository.create({ role: 'admin' })
    }

    if (!userRole) {
      userRole = await roleRepository.create({ role: 'user' })
    }

    if (!admin) {
      const adminHashPassword = await bcrypt.hash('admin', 10)
      admin = {
        username: 'admin',
        passwordHash: adminHashPassword,
        roleId: adminRole.id,
      }
      await userRepository.create(admin)
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  initDb,
  models,
  dbConnection: sequelize,
  repository,
}
export{}