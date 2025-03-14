import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          disabled={!newTask.trim()} 
          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 
            ${newTask.trim() 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed' 
            }`}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
