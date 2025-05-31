import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab, onSave }) => (
  <div className="top-bar d-flex justify-content-between align-items-center pb-4">
    <div className="tab-buttons d-flex gap-4">
      <button
        className={activeTab === 'in-class' ? 'active-tab' : 'inactive-tab'}
        onClick={() => setActiveTab('in-class')}
      >
        In-Class
      </button>
      <button
        className={activeTab === 'self-study' ? 'active-tab' : 'inactive-tab'}
        onClick={() => setActiveTab('self-study')}
      >
        Self-Study
      </button>
    </div>
    <button className="save-button" onClick={onSave}>
      Save
    </button>
  </div>
);

export default TabSwitcher;
