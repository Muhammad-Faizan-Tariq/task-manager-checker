import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await deleteTask(task._id);
    }
  };

  const handleToggle = async () => {
    await toggleComplete(task._id);
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 transition-all duration-200 hover:shadow-lg ${
      task.isCompleted
        ? 'border-gray-400 opacity-75'
        : task.priority === 'High'
          ? 'border-red-500'
          : task.priority === 'Medium'
            ? 'border-yellow-500'
            : 'border-green-500'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggle}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <h3 className={`text-lg font-semibold ${
            task.isCompleted
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-800 dark:text-white'
          }`}>
            {task.title}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-3 ml-8">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between ml-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
          aria-label="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
