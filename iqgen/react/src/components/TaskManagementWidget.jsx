import React from 'react';

function TaskManagementWidget({ tasks }) {
  return (
    <div>
      <h3>Tasks</h3>
      {tasks.map(task => (
        <div key={task._id}>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskManagementWidget;
