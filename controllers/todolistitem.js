const TodoList = require('../models/Todolist');
const TodoListItem = require('../models/TodoListItem');
const { isUndefined } = require('../utils');

// Create Todo List Item
const createTodoListItem = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const todoList = await TodoList.findByPk(id);

    if (!todoList) {
      return res.status(404).json({ error: 'Todo list not found' });
    }

    const todoListItem = await TodoListItem.create({
      content,
      todoListId: id
    });

    return res.status(201).json(todoListItem);
  } catch (error) {
    console.error('Error creating todo list item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit Todo List Item
const editTodoListItem = async (req, res) => {
  const { item_id } = req.params;
  const { content, complete } = req.body;

  try {
    const todoListItem = await TodoListItem.findByPk(item_id);

    if (!todoListItem) {
      return res.status(404).json({ error: 'Todo list item not found' });
    }

    todoListItem.complete = isUndefined(complete) ? todoListItem.complete : complete;
    todoListItem.content = isUndefined(content) ? todoListItem.content : content;
    await todoListItem.save();

    return res.status(200).json(todoListItem);
  } catch (error) {
    console.error('Error updating todo list item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Todo List Item
const deleteTodoListItem = async (req, res) => {
  const { item_id } = req.params;

  try {
    const todoListItem = await TodoListItem.findByPk(item_id);

    if (!todoListItem) {
      return res.status(404).json({ error: 'Todo list item not found' });
    }

    await todoListItem.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting todo list item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createTodoListItem,
  editTodoListItem,
  deleteTodoListItem
};
