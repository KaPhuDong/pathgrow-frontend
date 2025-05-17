import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab }) => (
  <div className="top-bar">
    <button
      className={activeTab === 'in-class' ? 'active-tab' : 'inactive-tab'}
      onClick={() => setActiveTab('in-class')}
    >
      In - Class
    </button>
    <button
      className={activeTab === 'self-study' ? 'active-tab' : 'inactive-tab'}
      onClick={() => setActiveTab('self-study')}
    >
      Self - Study
    </button>
    <button className="save-button">Save</button>
  </div>
);

export default TabSwitcher;
