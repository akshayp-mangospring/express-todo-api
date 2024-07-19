const TodoList = require('../models/Todolist');
const TodoListItem = require('../models/TodoListItem');
const User = require('../models/User');
const { isUndefined } = require('../utils');

// Create Todo List
const createTodoList = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const todoList = await TodoList.create({
      title,
      description,
      userId
    });

    return res.status(201).json(todoList);
  } catch (error) {
    console.error('Error creating todo list:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Todo Lists
const getAllTodoLists = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id, {
      include: {
        model: TodoList,
        as: 'todoLists',
        include: {
          model: TodoListItem,
          as: 'todoListItems'
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user.todoLists);
  } catch (error) {
    console.error('Error retrieving todo lists:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit Todo List
const editTodoList = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const todoList = await TodoList.findByPk(id);

    if (!todoList) {
      return res.status(404).json({ error: 'Todo list not found' });
    }

    todoList.title = isUndefined(title) ? todoList.title : title;
    todoList.description = isUndefined(description) ? todoList.description : description;
    await todoList.save();

    return res.status(200).json(todoList);
  } catch (error) {
    console.error('Error updating todo list:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Todo List
const deleteTodoList = async (req, res) => {
  const { id } = req.params;

  try {
    const todoList = await TodoList.findByPk(id);

    if (!todoList) {
      return res.status(404).json({ error: 'Todo list not found' });
    }

    await todoList.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting todo list:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllTodoLists,
  createTodoList,
  editTodoList,
  deleteTodoList
};
