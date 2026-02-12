const Task = require('../models/Task');

class TaskService {
  // Get all tasks sorted by priority (High > Medium > Low) and due date (earliest first)
  async getAllTasks() {
    // Use MongoDB aggregation for efficient sorting
    const tasks = await Task.aggregate([
      {
        $addFields: {
          priorityOrder: {
            $switch: {
              branches: [
                { case: { $eq: ['$priority', 'High'] }, then: 1 },
                { case: { $eq: ['$priority', 'Medium'] }, then: 2 },
                { case: { $eq: ['$priority', 'Low'] }, then: 3 }
              ],
              default: 2
            }
          }
        }
      },
      { $sort: { priorityOrder: 1, dueDate: 1 } },
      { $project: { priorityOrder: 0 } } // Remove helper field from results
    ]);
    return tasks;
  }

  // Create a new task
  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  // Update an existing task
  async updateTask(id, updateData) {
    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  // Delete a task
  async deleteTask(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  // Toggle task completion status
  async toggleComplete(id) {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.isCompleted = !task.isCompleted;
    return await task.save();
  }
}

module.exports = new TaskService();
