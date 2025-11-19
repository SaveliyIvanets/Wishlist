const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
)
User.associate = (models : any) => {
  User.belongsTo(models.Role, {
    foreignKey: 'roleId',
  })

  User.hasMany(models.Task, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
}
module.exports = User
