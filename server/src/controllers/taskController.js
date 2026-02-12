const taskService = require('../services/taskService');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ success: true, data: task });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle task completion
exports.toggleComplete = async (req, res) => {
  try {
    const task = await taskService.toggleComplete(req.params.id);
    res.json({ success: true, data: task });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
