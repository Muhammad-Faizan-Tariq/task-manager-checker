const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask, validateUpdate } = require('../middleware/validation');

// Get all tasks
router.get('/tasks', taskController.getTasks);

// Create new task
router.post('/tasks', validateTask, taskController.createTask);

// Update task
router.put('/tasks/:id', validateUpdate, taskController.updateTask);

// Delete task
router.delete('/tasks/:id', taskController.deleteTask);

// Toggle task completion
router.patch('/tasks/:id/toggle', taskController.toggleComplete);

module.exports = router;
