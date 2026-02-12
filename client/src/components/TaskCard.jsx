import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Calendar, Trash2 } from 'lucide-react';
import { triggerTaskCompletedConfetti } from '../utils/confetti';
import useSound from 'use-sound';
import DeleteModal from './DeleteModal';

const TaskCard = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [playCompleteSound] = useSound('/sounds/task-complete.mp3', {
    volume: 0.5,
    onError: (error) => {
      console.log('Sound file not found - continuing without sound:', error);
    }
  });

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);
    await deleteTask(task._id);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleToggle = async () => {
    const wasCompleted = task.isCompleted;
    await toggleComplete(task._id);

    // Trigger sound and confetti only when marking as complete (not when un-completing)
    if (!wasCompleted) {
      try {
        playCompleteSound();
      } catch (error) {
        console.log('Sound playback error:', error);
      }
      triggerTaskCompletedConfetti();
    }
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
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
    <>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        taskTitle={task.title}
      />
      <div className={`bg-white rounded-lg shadow-md p-6 md:p-5 border-l-4 transition-all duration-200 hover:shadow-lg ${
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
            className="w-7 h-7 md:w-6 md:h-6 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer active:scale-95 transition-transform"
          />
          <h3 className={`text-lg font-semibold ${
            task.isCompleted
              ? 'line-through text-gray-500'
              : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-3 ml-8">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between ml-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>

        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 active:scale-95"
          aria-label="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
    </>
  );
};

export default TaskCard;
