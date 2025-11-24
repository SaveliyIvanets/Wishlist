const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPublic:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'task',
  }
)
Task.associate = (models : any) => {
  Task.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
}

module.exports = Task
export{}