import React, { useState } from 'react';
import { Task } from '../interfaces';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      onEditTask(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg mb-3 hover:shadow-md hover:bg-indigo-900 hover:transform hover:-translate-y-1 transition-transform"> 
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            autoFocus
          />
          <button
            onClick={handleSaveEdit}
            className="p-2 text-green-500 hover:text-green-400 focus:outline-none"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className="p-2 text-red-500 hover:text-red-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                task.completed
                  ? 'bg-indigo-600 border-indigo-600 flex items-center justify-center'
                  : 'border-gray-500'
              }`}
            >
              {task.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </button>

            <span
              className={`text-lg max-w-[16rem] overflow-hidden truncate ${
                task.completed ? 'text-gray-500 line-through' : 'text-white'
              }`}
              title={task.text} 
            >
              {task.text}
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-2 text-gray-400 hover:text-red-500 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
