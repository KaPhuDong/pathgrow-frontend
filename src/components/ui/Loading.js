import React from 'react';
import '../../styles/components/loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">PathGrow</div>
      </div>
    </div>
  );
};

export default Loading;
