import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import Toast from './components/Toast';
import { Task } from './models/Task';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching tasks
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask: Task) => {
    try {
      const createdTask = await taskService.create(newTask);
      setTasks((prevTasks: Task[]) => [...prevTasks, createdTask]);
      setIsTaskFormOpen(false);
      setToastMessage('Task created successfully!');
    } catch (error) {
      console.error('Failed to create task:', error);
      setToastMessage('Failed to create task.');
    }
  };

  const handleTaskDelete = async (taskId: number) => {
    try {
      await taskService.delete(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setToastMessage('Task deleted successfully!');
    } catch (error) {
      console.error('Failed to delete task:', error);
      setToastMessage('Failed to delete task.');
    }
  };

  const handleStatusUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setToastMessage('Task status updated successfully!');
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      const updatedTask = await taskService.updateStatus(taskId, newStatus); // Call the backend endpoint
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: updatedTask.status } : task
        )
      );
      setToastMessage('Task status updated successfully!'); // Show success toast
    } catch (error) {
      console.error('Failed to update task status:', error);
      setToastMessage('Failed to update task status.'); // Show failure toast
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
        {loading ? (
          <div className="loading-spinner"></div> // Show loading spinner while fetching tasks
        ) : (
          <TaskList
            tasks={tasks}
            onTaskClick={handleTaskClick}
            onTaskDelete={handleTaskDelete}
            onUpdateStatus={updateTaskStatus} // Pass the status update handler
          />
        )}
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
            <TaskDetails
              task={selectedTask}
              onBack={handleBack}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
      )}

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}

export default App;
