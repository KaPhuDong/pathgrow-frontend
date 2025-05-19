import React, { useState } from 'react';

const LearningTarget = () => {
  const [goals, setGoals] = useState([
    { id: Date.now(), text: '', checked: false },
  ]);

  const handleAddGoal = () => {
    setGoals((prev) => [...prev, { id: Date.now(), text: '', checked: false }]);
  };

  const handleDeleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const handleInputChange = (id, newText) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, text: newText } : goal))
    );
  };

  const handleCheck = (id, checked) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, checked } : goal))
    );
  };

  return (
    <section className="learning-target">
      <h3>My learning target</h3>
      <p>
        At the end of this period learning, what exactly would I like to be able
        to do in the language?
        <br />
        <small>
          (Use the assessment grid or checklists your teachers provide to
          formulate your learning target as precisely as possible)
        </small>
      </p>
      <div className="goal-table">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="goal-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <div style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                checked={goal.checked}
                onChange={(e) => handleCheck(goal.id, e.target.checked)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <textarea
                placeholder={`Goal No. ${index + 1}`}
                value={goal.text}
                onChange={(e) => handleInputChange(goal.id, e.target.value)}
                className="goal-textarea"
                rows={2}
              />
            </div>
            <div>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                style={{ marginLeft: '8px' }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <button onClick={handleAddGoal}>+ Add Goal</button>
      </div>
    </section>
  );
};

export default LearningTarget;
