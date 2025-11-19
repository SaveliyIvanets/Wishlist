const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
class Role extends Model {}
Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'role',
  }
)
Role.associate = (models : any) => {
  Role.hasOne(models.User, {
    foreignKey: 'roleId',
    onDelete: 'SET NULL',
  })
}
module.exports = Role
export{}
