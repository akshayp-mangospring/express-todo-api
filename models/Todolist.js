const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User'); // Import the User model

const TodoList = db.define('todolists', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Ensure the title is not empty
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Set up the association
User.hasMany(TodoList, {
  foreignKey: 'userId',
  as: 'todoLists'
});

TodoList.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = TodoList;
