import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { Loader2, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-semibold">Error loading tasks:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-linear-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300"
      >
        <ClipboardList className="w-20 h-20 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Start organizing your day by adding your first task!</p>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Your Tasks ({tasks.length})
      </h2>
      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
