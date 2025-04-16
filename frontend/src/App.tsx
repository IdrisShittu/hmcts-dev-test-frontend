import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import { Task } from './models/Task';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

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
    setIsTaskFormOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleBack = () => {
    setSelectedTask(null);
  };

  return (
    <div className="app-container">
      <aside className="task-list-container">
        <div className="create-task-button-container">
          <button
            className="create-task-button"
            onClick={() => setIsTaskFormOpen(true)}
          >
            Create Task
          </button>
        </div>
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
      </aside>

      {isTaskFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal-button"
              onClick={() => setIsTaskFormOpen(false)}
            >
              &times;
            </button>
            <TaskForm onTaskCreated={addTask} />
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal-button"
              onClick={handleBack}
            >
              &times;
            </button>
            <TaskDetails task={selectedTask} onBack={handleBack} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
