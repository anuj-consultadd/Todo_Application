
import React from 'react';

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed }) => {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6 p-4 bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-white">Task</h2>
        <span className="text-xl font-bold text-gray-400">{completed}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="mr-4 text-xl font-bold text-white">Progress</span>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-indigo-600 h-4 rounded-full "
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;