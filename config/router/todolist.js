const express = require('express');
const { createTodoList, getAllTodoLists, editTodoList, deleteTodoList } = require('../../controllers/todolists');
const { createTodoListItem, editTodoListItem, deleteTodoListItem } = require('../../controllers/todolistitem');
const router = express.Router();

router.get('/', getAllTodoLists); // Get all todo lists for a user
router.post('/', createTodoList); // Create todo list
router.put('/:id', editTodoList); // Edit a todo list
router.delete('/:id', deleteTodoList); // Delete a todo list
router.post('/:id/todos', createTodoListItem); // Create todo list item
router.put('/:id/todos/:item_id', editTodoListItem); // Edit a todo list item
router.delete('/:id/todos/:item_id', deleteTodoListItem); // Delete a todo list item

module.exports = router;
