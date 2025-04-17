import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import Toast from './components/Toast'; // Import the Toast component
import { Task } from './models/Task';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Add toast message state

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

  const addTask = async (newTask: Task) => {
    try {
      const createdTask = await taskService.create(newTask); // Save the task to the backend
      setTasks((prevTasks: Task[]) => [...prevTasks, createdTask]);
      setIsTaskFormOpen(false);
      setToastMessage('Task created successfully!'); // Show success toast
    } catch (error) {
      console.error('Failed to create task:', error);
      setToastMessage('Failed to create task.'); // Show failure toast
    }
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

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}

export default App;
