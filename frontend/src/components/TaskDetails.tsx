import React, { useState } from 'react';
import { Task } from '../models/Task';
import { taskService } from '../services/taskService';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
  onStatusUpdate: (updatedTask: Task) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onBack, onStatusUpdate }) => {
  const [currentTask, setCurrentTask] = useState(task);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    setError(null);
    try {
      const updatedTask = await taskService.updateStatus(currentTask.id, newStatus);
      setCurrentTask(updatedTask);
      onStatusUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task status:', error);
      setError('Failed to update task status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="task-details">
      <button className="back-button" onClick={onBack}>
        Back to Task List
      </button>
      <h2 className="task-details-title">{currentTask.title}</h2>
      <p className="task-details-description">{currentTask.description}</p>
      <p className="task-details-status">
        <strong>Status:</strong> {currentTask.status}
      </p>
      <p className="task-details-dates">
        <strong>Created:</strong> {new Date(currentTask.createdDate).toLocaleString()}
      </p>
      <p className="task-details-dates">
        <strong>Due:</strong> {new Date(currentTask.dueDate).toLocaleString()}
      </p>
      <div className="status-update">
        <label htmlFor="status">Update Status:</label>
        <select
          id="status"
          value={currentTask.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={updating}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        {updating && <p className="status-update-message">Updating status...</p>}
        {error && <p className="status-update-error">{error}</p>}
      </div>
    </div>
  );
};

export default TaskDetails;