import React from 'react';
import { Task } from '../models/Task';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void; // Callback to go back to the task list
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onBack }) => {
  return (
    <div className="task-details">
      <button className="back-button" onClick={onBack}>
        Back to Task List
      </button>
      <h2 className="task-details-title">{task.title}</h2>
      <p className="task-details-description">{task.description}</p>
      <p className="task-details-status">
        <strong>Status:</strong> {task.status}
      </p>
      <p className="task-details-dates">
        <strong>Created:</strong> {new Date(task.createdDate).toLocaleString()}
      </p>
      <p className="task-details-dates">
        <strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskDetails;