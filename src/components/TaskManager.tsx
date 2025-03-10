import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Plus, X } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function TaskManager() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review crowd flow analytics', completed: false, priority: 'high' },
    { id: '2', title: 'Update emergency protocols', completed: true, priority: 'high' },
    { id: '3', title: 'Schedule staff training', completed: false, priority: 'medium' },
    { id: '4', title: 'Maintenance check', completed: false, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium'
      }
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Task Manager</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add new task..."
          className={`flex-1 px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 text-white placeholder-gray-400'
              : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          } border border-gray-200 dark:border-gray-600`}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {task.priority}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}