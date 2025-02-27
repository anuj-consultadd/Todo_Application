import  { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTasks([
      { id: 1, text: 'Morning workout', completed: true },
      { id: 2, text: 'Finish the essay', completed: false },
      { id: 3, text: 'Buy gift for Walter', completed: false },
      { id: 4, text: 'Call Jessie', completed: true },
      { id: 5, text: 'Meeting with team', completed: false }
    ]);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const completedCount = tasks.filter(task => task.completed).length;
      setProgress(Math.round((completedCount / tasks.length) * 100));
    } else {
      setProgress(0);
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const saveEdit = () => {
    if (editTaskId !== null) {
      setTasks(
        tasks.map(task =>
          task.id === editTaskId ? { ...task, text: editTaskText } : task
        )
      );
      setEditTaskId(null);
      setEditTaskText('');
    }
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-white">Task</h2>
            <span className="text-xl font-bold text-gray-400">{tasks.length}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-4 text-xl font-bold text-white">Progress</span>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="p-4 bg-gray-900 rounded-lg"
            >
              {editTaskId === task.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="p-2 text-green-500 hover:text-green-400 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-2 text-red-500 hover:text-red-400 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                        task.completed 
                          ? 'bg-indigo-600 border-indigo-600 flex items-center justify-center' 
                          : 'border-gray-500'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </button>
                    <span className={`text-lg ${
                      task.completed ? 'text-gray-500 line-through' : 'text-white'
                    }`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => startEdit(task)}
                      className="p-2 text-gray-400 hover:text-white focus:outline-none"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;