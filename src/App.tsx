import React, { useState, useEffect } from 'react';
import TaskForm from '@components/TaskForm';
import TaskItem from '@components/TaskItem';
import ProgressBar from '@components/ProgressBar';
import { Task } from 'interfaces';
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from '@utils/localStorage';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'inProgress'>('all'); // 👈 Filter state

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);
  
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number, text: string) => {
    setTasks(
      tasks.map(task => (task.id === id ? { ...task, text } : task))
    );
  };

  const completedCount = tasks.filter(task => task.completed).length;

  // 👇 Filtered tasks based on selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'inProgress') return !task.completed;
    return true;
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <ProgressBar total={tasks.length} completed={completedCount} />

        {/* 👇 Filter Buttons */}
        <div className="flex justify-between mb-4">
          {['all', 'completed', 'inProgress'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type as 'all' | 'completed' | 'inProgress')}
              className={`px-4 py-2 rounded-lg text-white ${
                filter === type ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <TaskForm onAddTask={addTask} />
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
