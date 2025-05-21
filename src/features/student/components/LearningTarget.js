// LearningTarget.jsx
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import api from '../../../api/student/api';

const LearningTarget = forwardRef(({ weekId }, ref) => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const response = await api.getWeeklyGoals(weekId);
      const data = response.data;
      if (Array.isArray(data)) {
        const formattedGoals = data.map((item) => ({
          id: item.id,
          text: item.name || '',
          checked: item.completed === true || item.completed === 1,
          isDirty: false,
        }));
        setGoals(formattedGoals);
      } else {
        console.warn('Dữ liệu trả về không phải là mảng:', data);
        setGoals([]);
      }
    } catch (error) {
      console.error('Lỗi khi fetch goals:', error);
      setGoals([]);
    }
  };

  useEffect(() => {
    if (weekId) {
      fetchGoals();
    }
  }, [weekId]);

  useImperativeHandle(ref, () => ({
    getCurrentData: () => goals,
  }));

  const handleAddGoal = async () => {
    try {
      const newGoal = {
        weekly_study_plan_id: weekId,
        name: `Goal No.${goals.length + 1}`,
        completed: false,
      };
      const response = await api.createWeeklyGoal(newGoal);
      const createdGoal = response.data;
      setGoals((prev) => [
        ...prev,
        {
          id: createdGoal.id,
          text: createdGoal.name || '',
          checked:
            createdGoal.completed === true || createdGoal.completed === 1,
          isDirty: false,
        },
      ]);
    } catch (error) {
      console.error('Lỗi khi thêm mục tiêu:', error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.deleteWeeklyGoal(id);
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa mục tiêu:', error);
    }
  };

  const handleInputChange = (id, newText) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, text: newText, isDirty: true } : goal
      )
    );
  };

  const handleCheck = (id, checked) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, checked, isDirty: true } : goal
      )
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
                <i class="fa-solid fa-xmark"></i>
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
});

export default LearningTarget;
