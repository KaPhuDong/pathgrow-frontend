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
          <div key={goal.id} className="goal-row">
            <div className="goal-checkbox">
              <input
                type="checkbox"
                checked={goal.checked}
                className="checkbox"
              />
            </div>
            <div style={{ flex: 1 }}>
              <textarea value={goal.text} className="goal-textarea" rows={2} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default LearningTarget;
