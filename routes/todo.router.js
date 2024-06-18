const express = require('express');
const router = express.Router();
const ToDoController = require('../controller/todo.controller');

router.post('/create', ToDoController.createToDo);
router.get('/list', ToDoController.getToDoList);
router.post('/delete', ToDoController.deleteToDo);

module.exports = router;
