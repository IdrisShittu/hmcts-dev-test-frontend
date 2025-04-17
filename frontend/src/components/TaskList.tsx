// src/components/TaskList.tsx
import React from 'react';
import { Task } from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void; // Callback for task click
  onTaskDelete: (taskId: number) => void; // Callback for task deletion
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onTaskDelete }) => {
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
              onClick={() => onTaskClick(task)} // Handle click event
              style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
            >
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <p className="task-status">
                <strong>Status:</strong> {task.status}
              </p>
              <p className="task-dates">
                <strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}
              </p>
              <button
                className="delete-task-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from propagating to the card
                  onTaskDelete(task.id); // Call the delete handler
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
