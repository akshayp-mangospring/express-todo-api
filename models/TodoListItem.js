const { DataTypes } = require('sequelize');
const db = require('../config/db');
const TodoList = require('./Todolist'); // Import the TodoList model

const TodoListItem = db.define('todoListItems', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true // Ensure the content is not empty
    }
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  todoListId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: TodoList,
      key: 'id'
    }
  }
});

// Set up the association
TodoListItem.belongsTo(TodoList, {
  foreignKey: 'todoListId',
  as: 'todoList',
  onDelete: 'CASCADE'
});

TodoList.hasMany(TodoListItem, {
  foreignKey: 'todoListId',
  as: 'todoListItems',
  onDelete: 'CASCADE'
});

module.exports = TodoListItem;
