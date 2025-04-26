import React from 'react';

// Define the Card component
const Card = ({ children, className, title }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// Default export
export { Card };