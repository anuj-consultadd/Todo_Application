
import { Task } from "../interfaces";

export const saveTasksToLocalStorage = (tasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const getTasksFromLocalStorage = (): Task[] => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };