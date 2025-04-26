import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="sidebar-item">
        <i className="bi bi-house-door"></i>
        <span>Home</span>
      </Link>

      <Link to="/files" className="sidebar-item">
        <i className="bi bi-file-earmark-text"></i>
        <span>Files</span>
      </Link>

      <Link to="/photos" className="sidebar-item">
        <i className="bi bi-image"></i>
        <span>Photos</span>
      </Link>

      <Link to="/job-settings" className="sidebar-item">
        <i className="bi bi-gear"></i>
        <span>Job Settings</span>
      </Link>

      <Link to="/conversations" className="sidebar-item">
        <i className="bi bi-chat-dots"></i>
        <span>Conversations</span>
      </Link>

      {user?.role === 'EPC' && (
        <Link to="/construction-progress" className="sidebar-item epc-only">
          <i className="bi bi-person-workspace"></i>
          <span>Construction</span>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
