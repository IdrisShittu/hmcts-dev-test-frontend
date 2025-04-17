// src/components/TaskList.tsx
import React from 'react';
import { Task } from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onUpdateStatus: (taskId: number, newStatus: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onTaskDelete, onUpdateStatus }) => {
  return (
    <div>
      <h2 className="task-list-heading">Task List</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks found.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div
              className="task-card"
              key={task.id}
              onClick={() => onTaskClick(task)} // Opens the detailed view
              style={{ cursor: 'pointer' }}
            >
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div className="task-status">
                <label htmlFor={`status-${task.id}`}><strong>Status:</strong></label>
                <select
                  id={`status-${task.id}`}
                  className="status-dropdown"
                  value={task.status}
                  onClick={(e) => e.stopPropagation()} // Prevents opening the detailed view
                  onChange={(e) => {
                    e.stopPropagation(); // Prevents opening the detailed view
                    onUpdateStatus(task.id, e.target.value);
                  }}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <p className="task-dates">
                <strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}
              </p>
              <button
                className="delete-task-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents opening the detailed view
                  onTaskDelete(task.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
