import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './models/Task';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
  };

  return (
    <div className="App">
      <TaskForm onTaskCreated={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
